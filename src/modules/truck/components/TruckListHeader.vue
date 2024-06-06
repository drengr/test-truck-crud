<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router';
import { TRUCK_CREATE_ROUTE_NAME } from '../routes';


const addNewTruckLocation: RouteLocationRaw = {
  name: TRUCK_CREATE_ROUTE_NAME
};
</script>

<template>
  <div class="grid align-items-center">
    <h3 class="col-8 my-2">Truck List</h3>
    <div class="col-4 text-right">
      <RouterLink :to="addNewTruckLocation">
        <BaseButton label="Add New Truck" severity="info" outlined />
      </RouterLink>
    </div>
  </div>
</template>
