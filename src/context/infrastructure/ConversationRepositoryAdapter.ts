import Conversation, { ConversationId } from '../domain/Conversation';
import ConversationRepository from '../domain/ConversationRepository';
import { mongodbApp } from '../../framework/mongodb/MongodbApp';
import WithMetadata from '../../framework/infrastructure/WithMetadata';

class ConversationRepositoryAdapter implements ConversationRepository {
  private testId: string | null = null;

  public setTestId(value: string): void {
    this.testId = value;
  }

  public async findByTestId(testId: string): Promise<WithMetadata<Omit<Conversation, 'paragraphs'>> | null> {
    const conversation = await mongodbApp
      .getDb()
      .collection<WithMetadata<Conversation>>('conversations')
      .findOne(
        {
          'metadata.testId': testId,
        },
        {
          projection: {
            paragraphs: 0,
          },
        },
      );

    if (!conversation) return null;

    conversation.id = conversation._id.toString();

    return conversation;
  }

  public async add(conversation: Conversation): Promise<ConversationId> {
    const payload = {
      paragraphs: conversation.paragraphs,
    };

    if (process.env.NODE_ENV === 'test') {
      payload['metadata'] = {
        testId: this.testId,
      };
    }

    const result = await mongodbApp.getDb().collection<Conversation>('conversations').insertOne(payload);

    return result.insertedId.toString();
  }
}

export const conversationRepositoryAdapter = new ConversationRepositoryAdapter();

export default ConversationRepositoryAdapter;
