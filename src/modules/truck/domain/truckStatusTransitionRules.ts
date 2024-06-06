import { TruckStatus } from './TruckStatus';

export const truckStatusTransitionRules = {
  [TruckStatus.AT_JOB]: [TruckStatus.RETURNING, TruckStatus.OUT_OF_SERVICE],
  [TruckStatus.LOADING]: [TruckStatus.TO_JOB, TruckStatus.OUT_OF_SERVICE],
  [TruckStatus.OUT_OF_SERVICE]: [TruckStatus.AT_JOB, TruckStatus.LOADING, TruckStatus.RETURNING, TruckStatus.OUT_OF_SERVICE, TruckStatus.TO_JOB],
  [TruckStatus.RETURNING]: [TruckStatus.LOADING, TruckStatus.OUT_OF_SERVICE],
  [TruckStatus.TO_JOB]: [TruckStatus.AT_JOB, TruckStatus.OUT_OF_SERVICE],
};
