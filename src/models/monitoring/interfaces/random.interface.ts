import { Status } from '../entity/monitoring.entity';

export interface RandomPayload {
  value: number;
  status: Status;
  device: {
    id_device: string;
  };
}
