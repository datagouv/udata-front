<template>
  <tr>
    <slot></slot>
  </tr>
</template>
<style scoped>
tr:nth-child(even) {
  --background-contrast-grey: var(--background-alt-grey);
  --background-contrast-hover: var(--background-alt-hover);
  --background-contrast-active: var(--background-alt-active);
}
</style>
