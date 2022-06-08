import Conversation from './Conversation';

interface SpeechRecognitionService {
  recognizeByAudioUri(audioUri: string): Promise<Conversation>;
}

export default SpeechRecognitionService;
