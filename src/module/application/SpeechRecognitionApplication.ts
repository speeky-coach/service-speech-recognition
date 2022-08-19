import { EventBus } from '@speeky/framework';
import SpeechRecognitionService from '../domain/SpeechRecognitionService';
import ConversationTranscribedDomainEvent from '../domain/ConversationTranscribedDomainEvent';
import Conversation from '../domain/Conversation';

class SpeechRecognitionApplication {
  constructor(private speechRecognitionService: SpeechRecognitionService, private eventBus: EventBus) {}

  public async transcribeAudioFile(conversation: Conversation): Promise<void> {
    const transcription = await this.speechRecognitionService.recognizeByAudioUri(
      conversation.userId,
      conversation.filename,
    );

    conversation.transcription = transcription;

    this.eventBus.publish(new ConversationTranscribedDomainEvent(conversation));
  }
}

export default SpeechRecognitionApplication;
