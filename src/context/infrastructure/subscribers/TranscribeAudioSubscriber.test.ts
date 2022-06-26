import { v4 as uuid } from 'uuid';
import sleep from '../../../framework/jest/sleep';
import { mongodbApp } from '../../../framework/mongodb/MongodbApp';
import { rabbitMQApp } from '../../../framework/rabbitmq/RabbitMQApp';
import RabbitMQEventBus from '../../../framework/rabbitmq/RabbitMQEventBus';
import rabbitmqHttpApi from '../../../framework/rabbitmq/rabbitmqHttpApi';
import ConversationTranscribedDomainEvent from '../../domain/ConversationTranscribedDomainEvent';
import { conversationRepositoryAdapter } from '../ConversationRepositoryAdapter';
import ConversationDomainEventDTO from './dtos/ConversationDomainEventDTO';
import { transcribeAudioSubscriber } from './TranscribeAudioSubscriber';

jest.setTimeout(2 * 60 * 1000);

describe('TranscribeAudioSubscriber', () => {
  beforeAll(async () => {
    RabbitMQEventBus.addSubscribers([transcribeAudioSubscriber]);

    await mongodbApp.connect();

    await rabbitMQApp.connect();
  });

  afterAll(async () => {
    await rabbitMQApp.close();
  });

  test('should transcribe an audio file', async () => {
    /* Given */
    const testId = uuid();
    console.log('TestId', testId);

    conversationRepositoryAdapter.setTestId(testId);

    /* When */
    rabbitMQApp.publishTest('domain_event.audio.uploaded', {
      data: {
        audioFileUri: 'gs://axy-development-audio-files/audio_test_1.flac',
      },
      eventName: 'test.domain_event.audio.uploaded',
      aggregateId: '',
      eventId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
      occurredOn: '2022-02-18T03:05:41.772Z',
    });

    await sleep(60 * 1000);

    /* Then */
    const conversation = await conversationRepositoryAdapter.findByTestId(testId);

    expect(conversation).not.toBeNull();
    expect(conversation!.metadata.testId).toBe(testId);

    const domainEvent = await rabbitmqHttpApi.findDomainEvent({
      aggregateId: conversation?.id!,
      eventName: ConversationTranscribedDomainEvent.EVENT_NAME,
    });
    expect(domainEvent as ConversationDomainEventDTO).not.toBeNull();
    expect((domainEvent as ConversationDomainEventDTO)?.data.id).toBe(conversation?.id!);
  });
});
