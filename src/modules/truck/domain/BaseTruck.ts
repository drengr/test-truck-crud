import type { TruckStatus } from './TruckStatus';

export interface BaseTruck {
  code: string;
  name: string;
  status: TruckStatus;
  description: string;
}
