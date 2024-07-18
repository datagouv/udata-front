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
    <h1 class="fr-h3">{{ t("Reuses") }}</h1>
    <h2 class="subtitle subtitle--uppercase">{{ t("{n} reuses of your organization", reuses.length) }}</h2>
    <div class="fr-table">
      <table>
        <thead>
          <th>
            {{ t("Reuse title") }}
          </th>
          <th>
            {{ t("Status") }}
          </th>
          <th>
            {{ t("Created at") }}
          </th>
          <th>
            {{ t("Datasets") }}
          </th>
          <th>
            <span class="fr-icon--sm fr-icon-chat-3-line" aria-hidden="true"></span>
          </th>
          <th>
            <span class="fr-icon--sm fr-icon-eye-line" aria-hidden="true"></span>
          </th>
          <th>
            <span class="fr-icon--sm fr-icon-star-s-line" aria-hidden="true"></span>
          </th>
        </thead>
        <tbody>
          <tr v-for="reuse in reuses">
            <td>
              {{ reuse.title }}
            </td>
            <td>
              {{ reuse.deleted ? "Deleted" : "Public" }}
            </td>
            <td>{{ formatDate(reuse.created_at) }}</td>
            <td>{{ reuse.datasets.length }}</td>
            <td>{{ reuse.metrics.discussions }}</td>
            <td>{{ reuse.metrics.view }}</td>
            <td>{{ reuse.metrics.followers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchPostEffect } from 'vue';
import { useI18n } from "vue-i18n";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import type { Me, Reuse } from "../../../types";
import { fetchMe } from "../../../api/me";
import { watchEffect } from 'vue';
import { formatDate, type Organization } from '@etalab/data.gouv.fr-components';
import { getOrganizationReuses } from '../../../api/reuses';

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const me = ref<Me | null>(null);
const organization = ref<Organization | null>(null);
const reuses = ref<Array<Reuse>>([]);
const page = ref(1);
const pageSize = ref(10);
const totalResult = ref(0);
const sort = ref("-created");

onMounted(async () => me.value = await fetchMe());

watchEffect(() => {
  organization.value = me.value?.organizations.find(organization => organization.id === props.oid) ?? null;
});

watchPostEffect(async () => {
  const response = await getOrganizationReuses(props.oid, page.value, pageSize.value, sort.value);
  reuses.value = response.data;
  page.value = response.page;
  pageSize.value = response.page_size;
  totalResult.value = response.total;
});
</script>
