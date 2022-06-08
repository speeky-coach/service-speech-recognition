import Conversation from '../../domain/Conversation';
import SpeechRecognitionService from '../../domain/SpeechRecognitionService';

class SpeechRecognitionServiceMock implements SpeechRecognitionService {
  public conversation: Conversation | null = null;

  public async recognizeByAudioUri(audioUri: string): Promise<Conversation> {
    return this.conversation!;
  }
}

export default SpeechRecognitionServiceMock;
