import { useToast } from 'primevue/usetoast';

export function useToastService() {
  const toast = useToast();

  function showError(message: string) {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 2000 });
  }

  function showSuccess(message: string) {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 2000 });
  }

  return {
    showError,
    showSuccess,
  }
}
