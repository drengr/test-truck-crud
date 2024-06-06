import { computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { DataTablePageEvent, DataTableSortEvent, DataTableProps } from 'primevue/datatable';
import { FilterMatchMode } from 'primevue/api';

import { truckApiClient } from '../api/client';
import type { Truck } from '../domain/Truck';
import { TruckStatus } from '../domain/TruckStatus';
import type { TruckStatusSelectOption } from '../domain/TruckStatusSelectOption';
import { getSelectedTableFilters } from '../utils/getSelectedTableFilters';
import { getTruckStatusSelectOptions } from '../utils/getTruckStatusSelectOptions';

function getOrder(order: DataTableProps['sortOrder']): string {
  return typeof order === 'number' && order > 0 ? 'asc' : 'desc';
}

const defaultSortField = 'code';
const statuses: TruckStatusSelectOption[] = getTruckStatusSelectOptions(Object.values(TruckStatus));


export function useTruckList() {
  const page = ref<number>(1);
  const itemsPerPage = ref<number>(10);
  const sortField = ref<string>(defaultSortField);
  const sortOrder = ref<DataTableProps['sortOrder']>(1);
  const totalItemsCount = ref<number>(0);

  const filters = ref({
    code: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    description: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const url = computed<string>(() => {
    const queryParams = new URLSearchParams({
      limit: itemsPerPage.value.toString(),
      order: getOrder(sortOrder.value),
      page: page.value.toString(),
      sort: sortField.value,
      ...getSelectedTableFilters(filters.value)
    });

    return `?${queryParams}`;
  });

  const {
    isFetching: loading,
    error,
    data: trucks,
    execute: loadTrucks,
    onFetchResponse,
  } = truckApiClient.get<Truck[]>(url, { immediate: false });

  onFetchResponse(({ headers }) => {
    const totalCountHeaderValue = headers.get('x-total-count');

    totalItemsCount.value = totalCountHeaderValue ? parseInt(totalCountHeaderValue, 10) : 0;
  });

  function onPageUpdate(eventData: DataTablePageEvent): void {
    page.value = eventData.page + 1;
    loadTrucks();
  }

  function onSortUpdate(eventData: DataTableSortEvent): void {
    sortField.value = typeof eventData.sortField === 'string' ? eventData.sortField : defaultSortField;
    sortOrder.value = eventData.sortOrder ?? 1;
    loadTrucks();
  }

  const debouncedFetch = useDebounceFn(() => {
    loadTrucks();
  }, 1000);

  function onFiltersApply(): void {
    debouncedFetch();
  }

  return {
    error,
    filters,
    itemsPerPage,
    loading,
    loadTrucks,
    onFiltersApply,
    onPageUpdate,
    onSortUpdate,
    sortField,
    sortOrder,
    statuses,
    totalItemsCount,
    trucks,
  };
}
