import { rabbitMQApp } from '../../app/server';

beforeAll(async () => {
  await rabbitMQApp.connect();
});

afterAll(async () => {});
