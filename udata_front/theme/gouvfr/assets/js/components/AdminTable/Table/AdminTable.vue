<template>
  <div class="fr-table">
    <table>
      <slot></slot>
    </table>
  </div>
</template>
<style scoped>
.fr-table {
  --lh: 1.125rem;
  --max-lines: 2;
}

.fr-table table :deep(td) {
  padding: 0.5rem 0.34375rem !important;
  border: 1px solid var(--grey-850-200);
  border-top: 0;
}

.fr-table table :deep(*) {
  font-size: 0.75rem;
  line-height: var(--lh);
}
</style>
