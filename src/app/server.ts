import * as dotenv from 'dotenv';
dotenv.config();

import { mongodbApp } from '../framework/mongodb/MongodbApp';
import { rabbitMQApp } from '../framework/rabbitmq/RabbitMQApp';
import RabbitMQEventBus from '../framework/rabbitmq/RabbitMQEventBus';

import subscribers from '../context/infrastructure/subscribers';

async function main() {
  try {
    RabbitMQEventBus.addSubscribers(subscribers);

    await mongodbApp.connect();

    await rabbitMQApp.connect();
  } catch (error) {
    console.error(error);
  }
}

main();
