import type { RouteRecordRaw } from 'vue-router';

export const TRUCK_LIST_ROUTE_NAME = 'truck-list';
export const TRUCK_EDIT_ROUTE_NAME = 'edit-truck';
export const TRUCK_CREATE_ROUTE_NAME = 'create-truck';

export const truckRoute: RouteRecordRaw = {
  path: '/truck',
  children: [
    {
      path: 'list',
      name: TRUCK_LIST_ROUTE_NAME,
      component: async () => await import('@/modules/truck/views/TruckList.vue'),
    },
    {
      path: 'edit/:id',
      props: true,
      name: TRUCK_EDIT_ROUTE_NAME,
      component: async () => await import('@/modules/truck/views/TruckDetails.vue'),
    },
    {
      path: 'new',
      name: TRUCK_CREATE_ROUTE_NAME,
      component: async () => await import('@/modules/truck/views/TruckDetails.vue'),
    },
  ]
};
