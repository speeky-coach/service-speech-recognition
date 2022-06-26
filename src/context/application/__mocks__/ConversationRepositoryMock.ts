import Conversation, { ConversationId } from '../../domain/Conversation';
import ConversationRepository from '../../domain/ConversationRepository';

class ConversationRepositoryMock implements ConversationRepository {
  public conversations: Conversation[] = [];

  public async add(conversation: Conversation): Promise<ConversationId> {
    const newId = this.conversations.length + 1;

    this.conversations.push({
      ...conversation,
      id: newId.toString(),
    });

    return newId.toString();
  }
}

export default ConversationRepositoryMock;
