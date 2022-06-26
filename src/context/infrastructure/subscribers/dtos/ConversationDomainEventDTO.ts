import DomainEventDTO from '../../../../framework/infrastructure/DomainEventDTO';
import Conversation from '../../../domain/Conversation';

interface ConversationDomainEventDTO extends DomainEventDTO {
  data: Conversation;
}

export default ConversationDomainEventDTO;
