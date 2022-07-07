import { UserId } from '../../framework/domain/types';
import { Transcription } from './Conversation';

interface SpeechRecognitionService {
  recognizeByAudioUri(userId: UserId, filename: string): Promise<Transcription>;
}

export default SpeechRecognitionService;
