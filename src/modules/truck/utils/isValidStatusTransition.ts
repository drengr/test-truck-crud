import type { TruckStatus } from '@/modules/truck/domain/TruckStatus';
import { truckStatusTransitionRules } from '../domain/truckStatusTransitionRules';

export function isValidStatusTransition(currentStatus: TruckStatus, possibleStatus: TruckStatus): boolean {
  return currentStatus === possibleStatus || truckStatusTransitionRules[currentStatus]?.includes(possibleStatus);
}
