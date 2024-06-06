<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";

import { useToastService } from '@/composables/useToastService';

import TruckListStatusSelect from '../components/TruckListStatusSelect.vue';
import { useTruckDetails } from '../composables/useTruckDetails';
import TruckDetailsFormErrorContainer from '../components/TruckDetailsFormErrorContainer.vue';
import TruckDetailsSkeleton from '../components/TruckDetailsSkeleton.vue';
import TruckDetailsHeader from '../components/TruckDetailsHeader.vue';
import TruckDetailsTextControl from '../components/TruckDetailsTextControl.vue';
import type { Truck } from '../domain/Truck';
import { defaultTruck } from '../domain/defaultTruck';
import { confirmTruckDeleting } from '../utils/confirmTruckDeleting';
import { TRUCK_LIST_ROUTE_NAME } from '../routes';

interface Props {
  id?: Truck['id'];
}

const props = defineProps<Props>();

const {
  createTruck,
  deleteTruck,
  fetchTruckDetails,
  isDeletingTruck,
  isFetchingTruck,
  isSavingTruck,
  statuses,
  truck,
  updateTruck,
  v$,
} = useTruckDetails();

const router = useRouter();

function navigateToTheList() {
  router.push({ name: TRUCK_LIST_ROUTE_NAME });
}

const { showError, showSuccess } = useToastService();

async function fetchTruck(id: string) {
  const success = await fetchTruckDetails(id);

  if (!success) {
    showError(`Sorry, we can't find this truck`);
    navigateToTheList();
  }
}

watchEffect(async () => {
  if (props.id) {
    fetchTruck(props.id.toString())
  } else {
    truck.value = { ...defaultTruck };
  }
});

function handleRequestResult(success: boolean, action: 'create' | 'update' | 'delete') {
  if (success) {
    showSuccess(`The truck has been successfully ${action}d`);
    navigateToTheList();
  } else {
    showError(`An error occured while trying to ${action} the truck`);
  }
}

async function onSubmitForm() {
  const isFormCorrect = await v$!.value.$validate();

  if (!isFormCorrect || !truck.value) {
    return;
  }

  if (truck.value.id) {
    await initTruckUpdate();
  } else {
    await initTruckCreate();
  }
}

async function initTruckUpdate() {
  const success = await updateTruck();

  handleRequestResult(success, 'update');
}

async function initTruckCreate() {
  const success = await createTruck();

  handleRequestResult(success, 'create');
}

const confirm = useConfirm();

function onTruckDelete() {
  confirmTruckDeleting(confirm, async () => {
    const success = await deleteTruck();
    handleRequestResult(success, 'delete');
  });
}
</script>

<template>
  <BaseCard>
    <template #title>
      <TruckDetailsHeader
        :isDeleteVisible="!!truck.id"
        :isDeleting="isDeletingTruck"
        :isSaving="isSavingTruck"
        @cancel="navigateToTheList"
        @delete="onTruckDelete"
      />
    </template>

    <template #content>
      <TruckDetailsSkeleton v-if="isFetchingTruck" />

      <form v-else-if="truck" id="truckDetailsForm" class="mt-4" @submit.prevent="onSubmitForm">
        <div class="p-fluid formgrid grid">
          <TruckDetailsTextControl
            v-model="v$.code.$model"
            :errors="v$.code.$errors"
            class="col-12 md:col-4"
            code="code"
            title="Code"
          />

          <TruckDetailsTextControl
            v-model="v$.name.$model"
            :errors="v$.name.$errors"
            class="col-12 md:col-4"
            code="name"
            title="Name"
          />

          <div class="field col-12 md:col-4">
            <label for="status">Status</label>
            <TruckListStatusSelect
              v-model="v$.status.$model"
              :class="{ 'p-invalid': v$.status.$errors.length }"
              :statuses="statuses"
              aria-describedby="status-help"
              id="status"
            />
            <TruckDetailsFormErrorContainer id="status-help" :errors="v$.status.$errors" />
          </div>

          <div class="field col-12 mt-2">
            <label for="description">Description</label>
            <BaseTextarea 
              v-model="truck.description" 
              autoResize 
              class="p-inputtextarea p-inputtext p-component"
              id="description" 
              rows="5"
            />
          </div>
        </div>
      </form>
    </template>
  </BaseCard>
</template>
