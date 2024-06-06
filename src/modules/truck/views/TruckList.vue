<script setup lang="ts">
import { useTruckList } from '../composables/useTruckList';
import TruckListHeader from '../components/TruckListHeader.vue'
import TruckListOpenDetailsActionLink from '../components/TruckListOpenDetailsActionLink.vue';
import TruckListInputFilter from '../components/TruckListInputFilter.vue';
import TruckListStatusSelect from '../components/TruckListStatusSelect.vue';
import { getTruckStatusDescription } from '../utils/getTruckStatusDescription';

const {
  error,
  filters,
  itemsPerPage,
  loading,
  loadTrucks,
  onFiltersApply,
  onPageUpdate,
  onSortUpdate,
  sortField,
  sortOrder,
  statuses,
  totalItemsCount,
  trucks,
} = useTruckList();

loadTrucks();
</script>

<template>
  <BaseCard>
    <template #title>
      <TruckListHeader />
    </template>

    <template #content>
      <DataTable :loading="loading" :rows="itemsPerPage" :sortField="sortField" :sortOrder="sortOrder"
        :total-records="totalItemsCount" :value="trucks" currentPageReportTemplate="{currentPage}" dataKey="id"
        filterDisplay="row" lazy paginator paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink"
        showGridlines v-model:filters="filters" @page="onPageUpdate" @sort="onSortUpdate" @filter="onFiltersApply">

        <BaseColumn field="actions" class="actions-column">
          <template #body="{ data }">
            <TruckListOpenDetailsActionLink :id="data.id" />
          </template>
        </BaseColumn>

        <BaseColumn field="code" header="Code" sortable :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <TruckListInputFilter v-model="filterModel.value" title="code" @input="filterCallback" />
          </template>
        </BaseColumn>

        <BaseColumn field="name" header="Name" sortable class="max-w-0 w-4 name-column" :showFilterMenu="false">
          <template #filter="{ filterModel, filterCallback }">
            <TruckListInputFilter v-model="filterModel.value" title="name" @input="filterCallback" />
          </template>
        </BaseColumn>

        <BaseColumn field="status" header="Status" sortable :showFilterMenu="false" :showClearButton="false">
          <template #body="{ data }">
            {{ getTruckStatusDescription(data.status) }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <TruckListStatusSelect v-model="filterModel.value" :statuses="statuses" clear placeholder="Search by status"
              @change="filterCallback" />
          </template>
        </BaseColumn>

        <BaseColumn field="description" header="Description"
          class="max-w-0 w-4 text-overflow-ellipsis white-space-nowrap overflow-hidden" :showFilterMenu="false">
          <template #body="{ data }">
            <span :title="data.description">{{ data.description }}</span>
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <TruckListInputFilter v-model="filterModel.value" title="description" @input="filterCallback" />
          </template>
        </BaseColumn>

        <template #empty>
          <div v-if="error">Something went wrong. Please try to refresh the page</div>
          <div v-else>No trucks found.</div>
        </template>
      </DataTable>
    </template>
    </BaseCard>
</template>

<style>
.name-column {
  word-wrap: break-word;
}

.actions-column {
  width: 50px;
}
</style>
