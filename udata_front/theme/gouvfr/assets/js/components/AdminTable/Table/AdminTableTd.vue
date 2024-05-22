<template>
  <td>
    <div>
      <slot>
      </slot>
    </div>
  </td>
</template>
<style scoped>
td > div {
  max-width: 16rem;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@supports (-webkit-line-clamp: 2) and (not (line-clamp: 2)) {
  td > div {
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
@supports(line-clamp: 2) {
  td > div {
    line-clamp: var(--max-lines);
    white-space: normal;
  }
}
</style>
