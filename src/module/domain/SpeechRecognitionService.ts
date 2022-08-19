import { UserId } from '@speeky/framework';
import { Transcription } from './Conversation';

interface SpeechRecognitionService {
  recognizeByAudioUri(userId: UserId, filename: string): Promise<Transcription>;
}

export default SpeechRecognitionService;
