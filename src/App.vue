<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="layout-wrapper">
    <div class="layout-main-container">
      <div class="layout-main">
        <RouterView />
      </div>
    </div>
  </div>
  <BaseToast />
  <ConfirmDialog />
</template>
