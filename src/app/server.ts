import 'dotenv/config';
import packageJson from '../../package.json';
import { rabbitMQApp } from '../setup/rabbitmq';
import speechRecognitionModule from '../module/module';

console.log('version', packageJson.version);

rabbitMQApp.addSubscriber(speechRecognitionModule.subscriber);

async function main() {
  try {
    await rabbitMQApp.connect();
  } catch (error) {
    console.error(error);
  }
}

main();

export { rabbitMQApp };
