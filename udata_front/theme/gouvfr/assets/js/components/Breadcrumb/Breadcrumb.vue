<template>
 <nav
        rol="navigation"
        :aria-label="t(`You're here:`)"
        class="fr-breadcrumb fr-mb-5v"
    >
        <ol class="fr-breadcrumb__list">
          <slot></slot>
        </ol>
    </nav>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
