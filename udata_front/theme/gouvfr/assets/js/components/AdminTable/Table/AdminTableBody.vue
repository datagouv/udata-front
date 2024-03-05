<template>
  <tbody>
    <slot></slot>
  </tbody>
</template>
<style scoped>
tbody {
  background-color: var(--background-default-grey);
  --hover: var(--background-default-grey-hover);
  --active: var(--background-default-grey-active);
}
</style>
