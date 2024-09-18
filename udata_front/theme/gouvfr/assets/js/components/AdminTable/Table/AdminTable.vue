<template>
  <div class="fr-table fr-mb-0">
    <table>
      <slot></slot>
    </table>
  </div>
</template>
<style lang="less" scoped>

@import "../../../../less/variables.less";

@media @dsfr-query-lg {
  .fr-table table {
    display: table;
  }
}

.fr-table {
  --lh: 1.125rem;
  --max-lines: 2;
}

.fr-table table :deep(th) {
  border: 1px solid var(--grey-850-200);
  border-bottom: 0;
}

.fr-table table :deep(tbody tr:nth-child(even)) {
  background-color: var(--background-alt-grey);
  --hover: var(--background-alt-grey-hover);
  --active: var(--background-alt-grey-active);
}

.fr-table table :deep(td) {
  padding: 0.5rem 0.34375rem !important;
  border: 1px solid var(--grey-850-200);
  border-top: 0;
  height: calc(var(--lh) * var(--max-lines) + 1rem);
}

.fr-table table :deep(*) {
  font-size: 0.75rem;
  line-height: var(--lh);
}

.fr-table :deep(tbody), .fr-table :deep(thead) {
  background-color: var(--background-default-grey);
  --hover: var(--background-default-grey-hover);
  --active: var(--background-default-grey-active);
}
</style>
