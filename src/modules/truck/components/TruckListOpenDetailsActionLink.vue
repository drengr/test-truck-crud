<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

import type { Truck } from '../domain/Truck';
import { TRUCK_EDIT_ROUTE_NAME } from '../routes';

interface Props {
  id: Truck['id'];
}
const props = defineProps<Props>();

const routeLocation = computed<RouteLocationRaw>(() => ({
  name: TRUCK_EDIT_ROUTE_NAME,
  params: { id: props.id }
}));
</script>

<template>
  <router-link :to="routeLocation">
    <BaseButton icon="pi pi-pencil" severity="info" text rounded title="Edit Truck" aria-label="Edit Truck" />
  </router-link>
</template>
