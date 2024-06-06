<script setup lang="ts">
interface Props {
  isDeleteVisible?: boolean;
  isDeleting?: boolean;
  isSaving?: boolean;
}

withDefaults(defineProps<Props>(), {
  isDeleteVisible: false,
  isDeleting: false,
  isSaving: false,
});

const emit = defineEmits<{
  (e: 'delete'): void;
  (e: 'cancel'): void;
}>();

function deleteTruck() {
  emit('delete');
}

function cancel() {
  emit('cancel');
}
</script>

<template>
  <div class="grid align-items-center">
    <h3 class="col-6 my-2">Truck Details</h3>
    <div class="col-6">
      <div class="flex justify-content-end flex-wrap gap-3">
        <BaseButton v-if="isDeleteVisible" label="Delete" severity="danger" :loading="isDeleting" @click="deleteTruck" />
        <BaseButton label="Save" severity="success" type="submit" form="truckDetailsForm" :loading="isSaving" />
        <BaseButton label="Cancel" outlined @click="cancel" />
      </div>
    </div>
  </div>
</template>
