<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import { computed } from 'vue';

import TruckDetailsFormErrorContainer from './TruckDetailsFormErrorContainer.vue';

interface Props {
  title: string;
  code: string;
  errors: ErrorObject[];
}

const props = defineProps<Props>();

const model = defineModel<string>();
const ariaId = computed(() => `${props.code}-help`)
</script>

<template>
  <div class="field">
    <label :for="code">{{ title }}</label>
    <InputText v-model="model" :id="code" :aria-describedby="ariaId" :class="{ 'p-invalid': errors.length }" />
    <TruckDetailsFormErrorContainer :id="ariaId" :errors="errors" />
  </div>
</template>
