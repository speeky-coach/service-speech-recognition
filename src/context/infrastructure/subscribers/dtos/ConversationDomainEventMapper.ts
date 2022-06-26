import DomainEventDTOMapper from '../../../../framework/infrastructure/DomainEventDTOMapper';
import ConversationTranscribedDomainEvent from '../../../domain/ConversationTranscribedDomainEvent';
import ConversationDomainEventDTO from './ConversationDomainEventDTO';

const conversationDomainEventMapper: DomainEventDTOMapper<
  ConversationTranscribedDomainEvent,
  ConversationDomainEventDTO
> = {
  toDTO: function (domainEvent: ConversationTranscribedDomainEvent): ConversationDomainEventDTO {
    return {
      data: domainEvent.data,
      eventName: domainEvent.eventName,
      aggregateId: domainEvent.aggregateId as string,
      eventId: domainEvent.eventId,
      occurredOn: domainEvent.occurredOn,
    };
  },
};

export default conversationDomainEventMapper;
