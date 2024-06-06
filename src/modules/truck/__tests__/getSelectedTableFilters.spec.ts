import { test, expect, } from 'vitest';
import type { DataTableFilterMetaData } from 'primevue/datatable';

import { getSelectedTableFilters } from '../utils/getSelectedTableFilters';

test('getSelectedTableFilters returns correct filters', () => {
  const filters: Record<string, DataTableFilterMetaData> = {
    code: { value: '1', matchMode: 'equals' },
    name: { value: '', matchMode: 'equals' },
  };
  const expectedFilters: Record<string, string> = {
    code: '1',
  };

  const result = getSelectedTableFilters(filters);

  expect(result).toEqual(expectedFilters);
})
