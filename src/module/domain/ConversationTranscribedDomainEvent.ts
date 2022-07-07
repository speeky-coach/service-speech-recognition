import DomainEvent from '../../framework/domain/bus/DomainEvent';
import Conversation from './Conversation';

class ConversationTranscribedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'domain_event.speech_recognition.conversation_transcribed';

  readonly data: Conversation;

  constructor(conversation: Conversation) {
    super(ConversationTranscribedDomainEvent.EVENT_NAME, conversation.id!);
    this.data = conversation;
  }
}

export default ConversationTranscribedDomainEvent;
