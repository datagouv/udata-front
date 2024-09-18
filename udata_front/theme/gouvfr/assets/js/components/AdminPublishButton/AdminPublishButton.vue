<template>
  <a :href="dataset_publishing_form_url" class="fr-btn fr-icon-add-line fr-btn--icon-left">
    {{ t("Publish on") }}
    <img class="fr-ml-1v" :src="logo" loading="lazy" :alt="title" />
  </a>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import logo from "../../../../templates/svg/logotype-white.svg";
import { dataset_publishing_form_url, title } from '../../config';

const { t } = useI18n();
</script>
