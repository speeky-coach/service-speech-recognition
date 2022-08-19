import { DomainEventDTO } from '@speeky/framework';
import SpeechRecognitionApplication from '../../application/SpeechRecognitionApplication';
import Conversation from '../../domain/Conversation';
import { speechRecognitionApplication } from '../speechRecognitionApplication';

interface ConversationCreated extends DomainEventDTO {
  data: Conversation;
}

class SpeechRecognitionSubscriber {
  private application: SpeechRecognitionApplication;

  constructor() {
    this.application = speechRecognitionApplication;
  }

  public async transcribeAudioFile(event: ConversationCreated): Promise<void> {
    const conversation = event.data;

    await this.application.transcribeAudioFile(conversation);
  }
}

export default SpeechRecognitionSubscriber;
