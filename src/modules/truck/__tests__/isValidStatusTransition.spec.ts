import { expect, test } from 'vitest';

import { isValidStatusTransition } from '../utils/isValidStatusTransition';
import { TruckStatus } from '@/modules/truck/domain/TruckStatus';

test('AT_JOB status can be changed to RETURNING', () => {
  const result = isValidStatusTransition(TruckStatus.AT_JOB, TruckStatus.RETURNING);

  expect(result).toBe(true);
});

test('LOADING status can be changed to TO_JOB', () => {
  const result = isValidStatusTransition(TruckStatus.LOADING, TruckStatus.TO_JOB);

  expect(result).toBe(true);
});

test('RETURNING status can be changed to LOADING', () => {
  const result = isValidStatusTransition(TruckStatus.RETURNING, TruckStatus.LOADING);

  expect(result).toBe(true);
});

test('TO_JOB status can be changed to AT_JOB', () => {
  const result = isValidStatusTransition(TruckStatus.TO_JOB, TruckStatus.AT_JOB);

  expect(result).toBe(true);
});

test('Each status can be changed to OUT_OF_SERVICE', () => {
  const result = Object.values(TruckStatus).every(status => isValidStatusTransition(status, TruckStatus.OUT_OF_SERVICE));

  expect(result).toBe(true);
});

test('OUT_OF_SERVICE status can be changed to any status', () => {
  const result = Object.values(TruckStatus).every(status => isValidStatusTransition(TruckStatus.OUT_OF_SERVICE, status));

  expect(result).toBe(true);
});

test('isValidStatusTransition returns false for invalid transitions', () => {
  const result = isValidStatusTransition(TruckStatus.LOADING, TruckStatus.AT_JOB);

  expect(result).toBe(false);
});
