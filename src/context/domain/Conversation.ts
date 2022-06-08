export type ConversationId = number;

export interface ConversationTime {
  seconds: string;
  nanos: number;
}

export interface Word {
  startsAt: ConversationTime;
  endsAt: ConversationTime;
  value: string;
  confidence: number;
}

export interface Paragraph {
  isTheUser: boolean;
  startsAt: ConversationTime;
  endsAt: ConversationTime;
  value: string;
  words: Word[];
}

interface Conversation {
  id: ConversationId | null;
  paragraphs: Paragraph[];
}

export default Conversation;
