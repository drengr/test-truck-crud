import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';

import { truckApiClient } from '../api/client';
import type { BaseTruck } from '../domain/BaseTruck';
import { defaultTruck } from '../domain/defaultTruck';
import type { Truck } from '../domain/Truck';
import { TruckStatus } from '../domain/TruckStatus';
import type { TruckStatusSelectOption } from '../domain/TruckStatusSelectOption';
import { truckValidationRules } from '../domain/truckValidationRules';
import { generateTruckDTO } from '../utils/generateTruckDTO';
import { getTruckStatusSelectOptions } from '../utils/getTruckStatusSelectOptions';
import { isValidStatusTransition } from '../utils/isValidStatusTransition';


export function useTruckDetails() {
  const truckId = ref<string>('');
  const truck = ref<Truck>({ ...defaultTruck });

  const initialStatus = ref<TruckStatus>(defaultTruck.status);
  const availableStatuses = computed<TruckStatus[]>(
    () => Object.values(TruckStatus)
      .filter(status => truckId.value ? isValidStatusTransition(initialStatus.value, status) : true)
  );
  const statuses = computed<TruckStatusSelectOption[]>(() => getTruckStatusSelectOptions(availableStatuses.value));

  const {
    isFetching: isFetchingTruck,
    data,
    error: truckFetchingError,
    execute: executeFetchTruck,
  } = truckApiClient.get<Truck>(truckId, { immediate: false });

  async function fetchTruckDetails(id: string) {
    truckId.value = id;
    await executeFetchTruck();

    if (data.value) {
      truck.value = data.value;
      initialStatus.value = data.value.status;
    }

    return !truckFetchingError.value;
  }

  const truckDTO = computed<BaseTruck>(() => generateTruckDTO(truck.value));

  const {
    isFetching: isCreatingTruck,
    error: truckCreatingError,
    execute: executeCreateTruck,
  } = truckApiClient.post<Truck>(truckDTO, { immediate: false });

  async function createTruck() {
    await executeCreateTruck();

    return !truckCreatingError.value;
  }

  const {
    isFetching: isUpdatingTruck,
    error: truckUpdatingError,
    execute: executeUpdateTruck,
  } = truckApiClient.put<Truck>(truckId, truckDTO, { immediate: false });

  async function updateTruck() {
    await executeUpdateTruck();

    return !truckUpdatingError.value;
  }

  const isSavingTruck = computed<boolean>(() => isCreatingTruck.value || isUpdatingTruck.value);

  const {
    isFetching: isDeletingTruck,
    error: truckDeletingError,
    execute: executeDeleteTruck,
  } = truckApiClient.delete(truckId, { immediate: false });

  async function deleteTruck() {
    await executeDeleteTruck();

    return !truckDeletingError.value;
  }

  const v$ = useVuelidate(truckValidationRules, truck);

  return {
    isDeletingTruck,
    deleteTruck,
    isFetchingTruck,
    fetchTruckDetails,
    statuses,
    v$,
    truck,
    createTruck,
    updateTruck,
    isSavingTruck,
  };
}
