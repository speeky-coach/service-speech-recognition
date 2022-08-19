import speech, { protos } from '@google-cloud/speech';
import { SpeechClient } from '@google-cloud/speech/build/src/v1p1beta1/speech_client';
import { UserId } from '@speeky/framework';

import { Paragraph, Word, ConversationTime, Transcription } from '../domain/Conversation';
import SpeechRecognitionService from '../domain/SpeechRecognitionService';

type LongRunningRecognizeResponse = protos.google.cloud.speech.v1p1beta1.ILongRunningRecognizeResponse;
type LongRunningRecognizeRequest = protos.google.cloud.speech.v1.ILongRunningRecognizeRequest;
type SpeechRecognitionResult = protos.google.cloud.speech.v1p1beta1.ISpeechRecognitionResult;
type SpeechRecognitionAlternative = protos.google.cloud.speech.v1p1beta1.ISpeechRecognitionAlternative;

const encoding = protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.FLAC;
const sampleRateHertz = 48000;
const languageCode = 'en-US';

const config = {
  encoding,
  sampleRateHertz,
  languageCode,
  audioChannelCount: 2,
  enableSpeakerDiarization: true,
  minSpeakerCount: 1,
  maxSpeakerCount: 2,
  model: 'phone_call',
  enableAutomaticPunctuation: true,
  enableWordTimeOffsets: true,
  enableWordConfidence: true,
};

class SpeechRecognitionServiceAdapter implements SpeechRecognitionService {
  private client: SpeechClient;

  constructor() {
    this.client = new speech.v1p1beta1.SpeechClient();
  }

  private getFileURL(userId: UserId, filename: string): string {
    return `gs://${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/users/${userId}/conversations/${filename}`;
  }

  private async getResponse(audioUri: string): Promise<LongRunningRecognizeResponse> {
    const request: LongRunningRecognizeRequest = {
      config,
      audio: {
        uri: audioUri,
      },
    };

    const [operation] = await this.client.longRunningRecognize(request);

    const [response] = await operation.promise();

    return response;
  }

  private getStartsAt(alternative: SpeechRecognitionAlternative): ConversationTime {
    return {
      seconds: alternative.words![0].startTime?.seconds?.toString()!,
      nanos: alternative.words![0].startTime?.nanos!,
    };
  }

  private getEndsAt(result: SpeechRecognitionResult): ConversationTime {
    return {
      seconds: result.resultEndTime?.seconds?.toString()!,
      nanos: result.resultEndTime?.nanos!,
    };
  }

  private getParagraphs(results: SpeechRecognitionResult[]): Paragraph[] {
    const speakerTaggedResult = results.pop();

    const paragraphs = results.map<Paragraph>((resultItem, index) => {
      const alternative: SpeechRecognitionAlternative = resultItem.alternatives![0];

      const startsAt: ConversationTime = this.getStartsAt(alternative);

      const endsAt: ConversationTime = this.getEndsAt(resultItem);

      // to refactoring
      const userTagNumber = speakerTaggedResult?.alternatives?.at(0)?.words?.at(-1)?.speakerTag;

      const words: Word[] = [];
      // to refactoring

      return {
        isTheUser: false,
        startsAt,
        endsAt,
        value: alternative.transcript!,
        words,
      };
    });

    return paragraphs;
  }

  public async recognizeByAudioUri(userId: UserId, filename: string): Promise<Transcription> {
    const audioURL = this.getFileURL(userId, filename);

    const { results, totalBilledTime } = await this.getResponse(audioURL);

    const paragraphs = this.getParagraphs(results!);

    const transcription: Transcription = {
      paragraphs,
    };

    return transcription;
  }
}

export const speechRecognitionServiceAdapter = new SpeechRecognitionServiceAdapter();

export default SpeechRecognitionServiceAdapter;
