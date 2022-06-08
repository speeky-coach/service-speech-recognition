import EventBus from '../../framework/domain/bus/EventBus';
import SpeechRecognitionService from '../domain/SpeechRecognitionService';
import ConversationTranscribedDomainEvent from '../domain/ConversationTranscribedDomainEvent';
import ConversationRepository from '../domain/ConversationRepository';

export interface ProcessAudioFileRequest {
  conversationAudioFileUri: string;
}

class SpeechRecognitionApplication {
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private conversationRepository: ConversationRepository,
    private eventBus: EventBus,
  ) {}

  public async processAudioFile({ conversationAudioFileUri }: ProcessAudioFileRequest): Promise<void> {
    const conversation = await this.speechRecognitionService.recognizeByAudioUri(conversationAudioFileUri);

    await this.conversationRepository.save(conversation);

    this.eventBus.publish([new ConversationTranscribedDomainEvent(conversation)]);
  }
}

export default SpeechRecognitionApplication;
