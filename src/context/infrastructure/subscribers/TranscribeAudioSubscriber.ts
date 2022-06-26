import AudioUploadedDomainEventDTO from './dtos/AudioUploadedDomainEventDTO';
import DomainEventSubscriber from '../../../framework/domain/bus/DomainEventSubscriber';
import RabbitMQEventBus from '../../../framework/rabbitmq/RabbitMQEventBus';
import SpeechRecognitionApplication, {
  TranscribeAudioFileRequest,
} from '../../application/SpeechRecognitionApplication';
import { speechRecognitionServiceAdapter } from '../SpeechRecognitionServiceAdapter';
import { conversationRepositoryAdapter } from '../ConversationRepositoryAdapter';
import conversationDomainEventMapper from './dtos/ConversationDomainEventMapper';

class TranscribeAudioSubscriber implements DomainEventSubscriber {
  private application: SpeechRecognitionApplication;

  constructor() {
    const eventBus = new RabbitMQEventBus(conversationDomainEventMapper);
    this.application = new SpeechRecognitionApplication(
      speechRecognitionServiceAdapter,
      conversationRepositoryAdapter,
      eventBus,
    );
  }

  subscribedTo(): string[] {
    return ['domain_event.audio.uploaded'];
  }

  async on(domainEventDTO: AudioUploadedDomainEventDTO): Promise<void> {
    const data: TranscribeAudioFileRequest = {
      conversationAudioFileUri: domainEventDTO.data.audioFileUri,
    };

    await this.application.transcribeAudioFile(data);
  }
}

export const transcribeAudioSubscriber = new TranscribeAudioSubscriber();

export default TranscribeAudioSubscriber;
