import { useConfirm } from "primevue/useconfirm";

export function confirmTruckDeleting({ require }: ReturnType<typeof useConfirm>, accept: () => void) {
  require({
    message: 'Do you want to delete this truck?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept,
  });
}
