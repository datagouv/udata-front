<template>
  <div class="fr-container--fluid">
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Me') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 v-if="me" class="fr-h1">{{ me.first_name }}  {{ me.last_name }}</h1>
    <div class="fr-alert fr-alert--info">
      <h3 class="fr-alert__title">{{ t('This is a WIP page') }}</h3>
      <p><a href="/admin/me/">{{ t('You can edit your profil on the current admin.') }}</a></p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import type { Me } from "../../../types";
import { fetchMe } from "../../../api/me";

const { t } = useI18n();
const me = ref<Me | null>(null);

onMounted(async () => me.value = await fetchMe());
</script>
