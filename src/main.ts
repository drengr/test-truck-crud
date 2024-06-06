import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';

import PrimeVue from 'primevue/config';
import BaseCard from 'primevue/card';
import BaseButton from 'primevue/button';
import DataTable from 'primevue/datatable';
import BaseColumn from 'primevue/column';
import InputText from 'primevue/inputtext';
import BaseSkeleton from 'primevue/skeleton';
import BaseTextarea from 'primevue/textarea';
import BaseDropdown from 'primevue/dropdown';

import ToastService from 'primevue/toastservice';
import BaseToast from 'primevue/toast';

import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';


import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component('BaseCard', BaseCard);
app.component('DataTable', DataTable);
app.component('BaseColumn', BaseColumn);
app.component('BaseButton', BaseButton);
app.component('InputText', InputText);
app.component('BaseTextarea', BaseTextarea);
app.component('BaseSkeleton', BaseSkeleton);
app.component('BaseToast', BaseToast);
app.component('ConfirmDialog', ConfirmDialog);
app.component('BaseDropdown', BaseDropdown);

router
  .isReady()
  .then(() => app.mount('#app'))
  .catch(e => console.error(e));
