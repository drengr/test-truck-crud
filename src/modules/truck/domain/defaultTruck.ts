import type { Truck } from './Truck';
import { TruckStatus } from './TruckStatus';

export const defaultTruck: Truck = {
  code: '',
  description: '',
  id: '',
  name: '',
  status: TruckStatus.LOADING,
}
