import Conversation, { ConversationId } from './Conversation';

interface ConversationRepository {
  add(conversation: Conversation): Promise<ConversationId>;
}

export default ConversationRepository;
