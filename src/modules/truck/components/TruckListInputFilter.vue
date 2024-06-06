<script setup lang="ts">
import type { ColumnFilterModelType } from 'primevue/column';
import { computed } from 'vue';

interface Props {
  title: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'input', data: Event): void }>();

const filterModel = defineModel<ColumnFilterModelType['value']>('filterModel');

const placeholder = computed<string>(() => `Search by ${props.title}`);

function onInput(e: Event): void {
  emit('input', e);
}
</script>

<template>
  <InputText 
    v-model="filterModel" 
    :placeholder="placeholder" 
    type="text" 
    @input="onInput"
  />
</template>
