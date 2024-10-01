<template>
  <a :href="link" class="fr-btn fr-icon-add-line fr-btn--icon-left">
    {{ t("Publish on") }}
    <img class="fr-ml-1v" :src="logo" loading="lazy" :alt="title" />
  </a>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import logo from "../../../../templates/svg/logotype-white.svg";
import { admin_root, dataset_publishing_form_url, reuse_publishing_form_url, title } from '../../config';
import { computed } from 'vue';

const props = defineProps<{
  type: "dataset" | "harvester" | "reuse"
}>();

const { t } = useI18n();

const link = computed(() => {
  switch(props.type) {
    case 'dataset':
      return dataset_publishing_form_url;
    case 'harvester':
      return `${admin_root}harvester/new/`;
    case 'reuse':
      return reuse_publishing_form_url;
  }
});
</script>
