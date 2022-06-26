import EventBus from '../../framework/domain/bus/EventBus';
import SpeechRecognitionService from '../domain/SpeechRecognitionService';
import ConversationTranscribedDomainEvent from '../domain/ConversationTranscribedDomainEvent';
import ConversationRepository from '../domain/ConversationRepository';

export interface TranscribeAudioFileRequest {
  conversationAudioFileUri: string;
}

class SpeechRecognitionApplication {
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private conversationRepository: ConversationRepository,
    private eventBus: EventBus,
  ) {}

  public async transcribeAudioFile({ conversationAudioFileUri }: TranscribeAudioFileRequest): Promise<void> {
    const conversation = await this.speechRecognitionService.recognizeByAudioUri(conversationAudioFileUri);

    const conversationId = await this.conversationRepository.add(conversation);

    conversation.id = conversationId;

    this.eventBus.publish([new ConversationTranscribedDomainEvent(conversation)]);
  }
}

export default SpeechRecognitionApplication;
