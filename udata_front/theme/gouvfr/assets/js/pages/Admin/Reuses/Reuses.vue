<template>
  <div class="fr-container--fluid">
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="organization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ organization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Reuses') }}
        </a>
      </li>
    </Breadcrumb>
    <div class="fr-alert fr-alert--info">
      <h3 class="fr-alert__title">{{ t('This is a WIP page') }}</h3>
      <p><a :href="url">{{ t('You can manage your reuses on the current admin.') }}</a></p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import type { Me } from "../../../types";
import { fetchMe } from "../../../api/me";
import { watchEffect } from 'vue';
import type { Organization } from '@etalab/data.gouv.fr-components';

const { t } = useI18n();
const props = defineProps<{oid: string}>();
const url = `/admin/organization/${props.oid}/`;

const me = ref<Me | null>(null);
const organization = ref<Organization | null>(null);

onMounted(async () => me.value = await fetchMe());

watchEffect(() => {
  organization.value = me.value?.organizations.find(organization => organization.id === props.oid) ?? null;
});
</script>
