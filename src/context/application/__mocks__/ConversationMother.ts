import Conversation, { ConversationId } from '../../domain/Conversation';

class ConversationMother {
  public static create(conversationId: ConversationId | null): Conversation {
    const conversation: Conversation = {
      id: conversationId,
      paragraphs: [
        {
          isTheUser: false,
          startsAt: { seconds: '2', nanos: 800000000 },
          endsAt: { seconds: '3', nanos: 500000000 },
          value: 'Okay. I have a pronunciation quiz for you.',
          words: [
            {
              startsAt: { seconds: '2', nanos: 800000000 },
              endsAt: { seconds: '3', nanos: 500000000 },
              value: 'Okay.',
              confidence: 0.6129787564277649,
            },
            {
              startsAt: { seconds: '3', nanos: 500000000 },
              endsAt: { seconds: '3', nanos: 800000000 },
              value: 'I',
              confidence: 0.8375823497772217,
            },
            {
              startsAt: { seconds: '3', nanos: 800000000 },
              endsAt: { seconds: '4', nanos: 200000000 },
              value: 'have',
              confidence: 0.8375823497772217,
            },
            {
              startsAt: { seconds: '4', nanos: 200000000 },
              endsAt: { seconds: '4', nanos: 200000000 },
              value: 'a',
              confidence: 0.8375823497772217,
            },
            {
              startsAt: { seconds: '4', nanos: 200000000 },
              endsAt: { seconds: '5', nanos: 300000000 },
              value: 'pronunciation',
              confidence: 0.8375823497772217,
            },
            {
              startsAt: { seconds: '5', nanos: 300000000 },
              endsAt: { seconds: '5', nanos: 600000000 },
              value: 'quiz',
              confidence: 0.6236358284950256,
            },
            {
              startsAt: { seconds: '5', nanos: 600000000 },
              endsAt: { seconds: '5', nanos: 900000000 },
              value: 'for',
              confidence: 0.7607168555259705,
            },
            {
              startsAt: { seconds: '5', nanos: 900000000 },
              endsAt: { seconds: '6', nanos: 100000000 },
              value: 'you.',
              confidence: 0.8375823497772217,
            },
          ],
        },
      ],
    };

    return conversation;
  }

  public static createWithoutId(): Conversation {
    return ConversationMother.create(null);
  }
}

export default ConversationMother;
