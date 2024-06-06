import type { BaseTruck } from '@/modules/truck/domain/BaseTruck';
import type { Truck } from '@/modules/truck/domain/Truck';

export function generateTruckDTO(truck: Truck): BaseTruck {
  return {
    code: truck.code,
    description: truck.description,
    name: truck.name,
    status: truck.status,
  };
}
