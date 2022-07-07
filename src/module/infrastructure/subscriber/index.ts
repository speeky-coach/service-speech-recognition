import RabbitMQSubscriber from '../../../framework/rabbitmq/RabbitMQSubscriber';
import SpeechRecognitionSubscriber from './SpeechRecognitionSubscriber';

const subscriber = new RabbitMQSubscriber();

const speechRecognitionSubscriber = new SpeechRecognitionSubscriber();

subscriber.on(
  'domain_event.conversation.created',
  speechRecognitionSubscriber.transcribeAudioFile.bind(speechRecognitionSubscriber),
);

export default subscriber;
