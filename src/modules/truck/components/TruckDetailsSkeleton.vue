<template>
  <div class="border-round border-1 surface-border p-4 surface-card">
    <div class="flex mb-3">
      <BaseSkeleton shape="circle" size="4rem" class="mr-2" />
      <div>
        <BaseSkeleton width="10rem" class="mb-2" />
        <BaseSkeleton width="5rem" class="mb-2" />
        <BaseSkeleton height=".5rem" />
      </div>
    </div>
    <BaseSkeleton width="100%" height="150px" />
    <div class="flex justify-content-between mt-3">
      <BaseSkeleton width="4rem" height="2rem" />
      <BaseSkeleton width="4rem" height="2rem" />
    </div>
  </div>
</template>
