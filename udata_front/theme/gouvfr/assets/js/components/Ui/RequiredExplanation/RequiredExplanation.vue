<template>
  <i18n-t
    keypath="Fields preceded by a star ({markup}) are required."
    tag="p"
    class="fr-mt-0 fr-mb-1w fr-text--xs"
    scope="global"
  >
    <template #markup>
      <span class="required-field-star">*</span>
    </template>
  </i18n-t>
</template>
