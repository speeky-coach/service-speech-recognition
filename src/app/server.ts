import 'dotenv/config';

import { rabbitMQApp } from '../framework/rabbitmq/RabbitMQApp';
import speechRecognitionModule from '../module/module';

rabbitMQApp.addSubscriber(speechRecognitionModule.subscriber);

async function main() {
  try {
    await rabbitMQApp.connect();
  } catch (error) {
    console.error(error);
  }
}

main();
