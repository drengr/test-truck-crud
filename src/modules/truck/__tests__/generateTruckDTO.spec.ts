import { test, expect, } from 'vitest'
import { generateTruckDTO } from '../utils/generateTruckDTO';
import { TruckStatus } from '@/modules/truck/domain/TruckStatus';

test('generateTruckDTO creates a valid DTO', () => {
  const expectedDTO = {
    code: '1', name: '1', description: '1', status: TruckStatus.LOADING
  };

  const result = generateTruckDTO({ id: 1, code: '1', name: '1', description: '1', status: TruckStatus.LOADING });

  // Assert
  expect(result).toEqual(expectedDTO);
})
