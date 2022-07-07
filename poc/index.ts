import { writeFile } from 'node:fs/promises';
import speech, { protos } from '@google-cloud/speech';

const client = new speech.v1p1beta1.SpeechClient();

const gcsUri = 'gs://axy-development-audio-files/audio_test_1.flac';
const encoding = protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.FLAC;
const sampleRateHertz = 48000;
const languageCode = 'en-US';

const config = {
  encoding,
  sampleRateHertz,
  languageCode,
  audioChannelCount: 2,
  enableSpeakerDiarization: true,
  minSpeakerCount: 2,
  maxSpeakerCount: 2,
  model: 'phone_call',
  enableAutomaticPunctuation: true,
  enableWordTimeOffsets: true,
  enableWordConfidence: true,
};

const audio = {
  uri: gcsUri,
};

const request: protos.google.cloud.speech.v1.ILongRunningRecognizeRequest = {
  config,
  audio,
};

interface Word {
  startsAt: string;
  endsAt: string;
  value: string;
  confidence: number;
}

interface Paragraph {
  speakerId: number;
  startsAt: string;
  endsAt: string;
  value: string;
  words: Word[];
}

async function main() {
  try {
    console.log('Detects speech in the audio file');

    const [operation] = await client.longRunningRecognize(request);

    console.log({ operation });

    console.log('Get a Promise representation of the final result of the job');

    const [response] = await operation.promise();

    console.log({ response });

    await writeFile('./data/response.json', JSON.stringify(response));

    const transcription = response
      .results!.map((result) => {
        console.log({ result });

        console.log({ alternatives: result.alternatives! });

        console.log({ alternative_0: JSON.stringify(result.alternatives![0]) });

        return result.alternatives![0].transcript;
      })
      .join('\n');

    console.log(`Transcription: ${transcription}`);
  } catch (error) {
    console.log(error);
  }
}

main();
