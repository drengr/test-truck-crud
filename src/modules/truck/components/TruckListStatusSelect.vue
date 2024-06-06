<script setup lang="ts">
import type { ColumnFilterModelType } from 'primevue/column';
import type { MultiSelectChangeEvent } from 'primevue/multiselect';

import type { TruckStatusSelectOption } from '../domain/TruckStatusSelectOption';

interface Props {
  clear?: boolean;
  statuses: TruckStatusSelectOption[];
}

withDefaults(defineProps<Props>(), {
  clear: false,
});
const emit = defineEmits<{ (e: 'change', data: MultiSelectChangeEvent): void }>();

const filterModel = defineModel<ColumnFilterModelType['value']>('filterModel');

function onChange(e: MultiSelectChangeEvent): void {
  emit('change', e);
}
</script>

<template>
  <BaseDropdown v-model="filterModel" :options="statuses" optionLabel="text" optionValue="value" :showClear="clear"
    @change="onChange" />
</template>
