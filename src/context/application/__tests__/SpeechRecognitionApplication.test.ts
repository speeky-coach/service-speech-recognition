import ConversationRepositoryMock from '../__mocks__/ConversationRepositoryMock';
import SpeechRecognitionServiceMock from '../__mocks__/SpeechRecognitionServiceMock';
import EventBusMock from '../../../framework/domain/__mocks__/EventBusMock';
import ConversationMother from '../__mocks__/ConversationMother';
import SpeechRecognitionApplication from '../SpeechRecognitionApplication';

describe('SpeechRecognitionApplication', () => {
  const conversationRepositoryMock = new ConversationRepositoryMock();
  const speechRecognitionServiceMock = new SpeechRecognitionServiceMock();
  const eventBusMock = new EventBusMock();

  const speechRecognitionApplication = new SpeechRecognitionApplication(
    speechRecognitionServiceMock,
    conversationRepositoryMock,
    eventBusMock,
  );

  beforeEach(() => {
    conversationRepositoryMock.conversations = [];
    speechRecognitionServiceMock.conversation = null;
    eventBusMock.events = [];
  });

  describe('successful test suit', () => {
    test('it should save the transcribed conversation', async () => {
      // Given
      const conversation = ConversationMother.createWithoutId();
      const conversationSnapshot = structuredClone(conversation);

      speechRecognitionServiceMock.conversation = conversation;

      // When
      await speechRecognitionApplication.processAudioFile({
        conversationAudioFileUri: 'gs://axy-development-audio-files/audio_test_1.flac',
      });

      // Then
      expect(conversationRepositoryMock.conversations.at(0)).toMatchObject({
        id: 1,
        paragraphs: [...conversationSnapshot.paragraphs],
      });
      // eventBusMock.events.at(0);
    });
  });
});
