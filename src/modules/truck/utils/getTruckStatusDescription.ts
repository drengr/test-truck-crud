import { TruckStatus } from '../domain/TruckStatus';

const truckStatusDescriptionDictionary = {
  [TruckStatus.AT_JOB]: 'At Job',
  [TruckStatus.LOADING]: 'Loading',
  [TruckStatus.OUT_OF_SERVICE]: 'Out of Service',
  [TruckStatus.RETURNING]: 'Returning',
  [TruckStatus.TO_JOB]: 'To Job',
}

export function getTruckStatusDescription(status: TruckStatus): string {
  return truckStatusDescriptionDictionary[status] || '';
}
