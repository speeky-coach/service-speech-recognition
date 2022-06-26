import DomainEventDTO from '../../../../framework/infrastructure/DomainEventDTO';

interface AudioDTO {
  audioFileUri: string;
}

interface AudioUploadedDomainEventDTO extends DomainEventDTO {
  data: AudioDTO;
}

export default AudioUploadedDomainEventDTO;
