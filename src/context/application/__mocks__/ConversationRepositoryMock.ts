import Conversation from '../../domain/Conversation';
import ConversationRepository from '../../domain/ConversationRepository';

class ConversationRepositoryMock implements ConversationRepository {
  public conversations: Conversation[] = [];

  public async save(conversation: Conversation): Promise<void> {
    this.conversations.push({
      ...conversation,
      id: this.conversations.length + 1,
    });
  }
}

export default ConversationRepositoryMock;
