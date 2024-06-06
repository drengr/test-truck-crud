import type { DataTableFilterMetaData } from 'primevue/datatable';

export function getSelectedTableFilters(filters: Record<string, DataTableFilterMetaData>): Record<string, string> {
  return Object.entries(filters).reduce<Record<string, string>>((acc, [key, { value }]) => {

    if (value) {
      acc[key] = value;
    }

    return acc;
  }, {})
}
