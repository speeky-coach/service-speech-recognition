import Conversation from './Conversation';

interface ConversationRepository {
  save(conversation: Conversation): Promise<void>;
}

export default ConversationRepository;
