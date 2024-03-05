<template>
  <thead>
    <slot></slot>
  </thead>
</template>
<style scoped>
thead {
  background-color: var(--background-default-grey);
  --hover: var(--background-default-grey-hover);
  --active: var(--background-default-grey-active);
}
</style>
