import { rabbitMQEventBus } from '../../setup/rabbitmq';
import SpeechRecognitionApplication from '../application/SpeechRecognitionApplication';
import { speechRecognitionServiceAdapter } from './SpeechRecognitionServiceAdapter';

export const speechRecognitionApplication = new SpeechRecognitionApplication(
  speechRecognitionServiceAdapter,
  rabbitMQEventBus,
);
