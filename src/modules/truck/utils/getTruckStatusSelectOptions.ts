import type { TruckStatus } from '../domain/TruckStatus';
import type { TruckStatusSelectOption } from '../domain/TruckStatusSelectOption';
import { getTruckStatusDescription } from '../utils/getTruckStatusDescription';

export function getTruckStatusSelectOptions(statuses: TruckStatus[]): TruckStatusSelectOption[] {
  return statuses.map(status => ({ text: getTruckStatusDescription(status), value: status }));
}
