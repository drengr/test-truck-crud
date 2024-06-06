<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

interface Props {
  errors: ErrorObject[]
}

defineProps<Props>();
</script>

<template>
  <div>
    <div class="p-error" v-for="error of errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
