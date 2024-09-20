<template>
  <div class="fr-container--fluid">
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="currentOrganization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ currentOrganization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Discussions') }}
        </a>
      </li>
    </Breadcrumb>
    <h1 class="fr-h3">{{ t("Discussions") }}</h1>
    <h2 class="subtitle subtitle--uppercase">{{ t("{n} discussions", discussions.length) }}</h2>
      <AdminTable :loading>
        <thead>
          <AdminTableTh scope="col">
            {{ t("Discussion") }}
          </AdminTableTh>
          <AdminTableTh scope="col">
            {{ t("Status") }}
          </AdminTableTh>
          <AdminTableTh scope="col">
            {{ t("Created at") }}
          </AdminTableTh>
          <AdminTableTh scope="col">
            {{ t("Closed at") }}
          </AdminTableTh>
          <AdminTableTh scope="col">
            {{ t("URL") }}
          </AdminTableTh>
        </thead>
        <tbody>
          <tr v-for="discussion in discussions">
            <td>
              <p class="fr-text--bold">{{ discussion.title }}</p>
              <p v-if="subjects[discussion.subject.id]">
                <a
                  class="fr-link inline-flex"
                  :href="subjects[discussion.subject.id].page"
                >
                  <Vicon :height="12" class="self-center" :name="getSubjectTypeIcon(discussion.subject)"/>
                  <TextClamp :text="getSubjectTitle(subjects[discussion.subject.id])" :auto-resize="true" :max-lines="1"/>
                </a>
              </p>
            </td>
            <td>
              {{ discussion.closed ? "Closed" : "Public" }}
            </td>
            <td>{{ formatDate(discussion.created) }}</td>
            <td>
              <template v-if="discussion.closed">{{ formatDate(discussion.closed) }}</template></td>
            <td>
              <a
                class="fr-link inline-flex"
                :href="getDiscussionUrl(discussion.id)"
                target="_blank"
              >
                <TextClamp
                  :text="getDiscussionUrl(discussion.id)"
                  :auto-resize="true"
                  :max-lines="1"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </AdminTable>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '@datagouv/components';
import { OhVueIcon as Vicon } from "oh-vue-icons";
import { ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import TextClamp from "vue3-text-clamp";
import { getOrganizationDiscussions, getSubject, getSubjectTitle, getSubjectTypeIcon } from '../../../api/discussions';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { dataset_url } from '../../../config';
import type { DiscussionSubjectTypes, Thread } from "../../../types";
import AdminTable from '../../../components/AdminTable/Table/AdminTable.vue';
import AdminTableTh from '../../../components/AdminTable/Table/AdminTableTh.vue';

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const loading = ref(false);
const discussions = ref<Array<Thread>>([]);
const subjectPromises = ref<Record<string, Promise<DiscussionSubjectTypes>>>({});
const subjects = ref<Record<string, DiscussionSubjectTypes>>({});

const { currentOrganization } = useCurrentOrganization();

function getDiscussionUrl(discussionId: string) {
  const discussionUrl = "discussions/" + discussionId;

  return window.location.origin + dataset_url + "#/" + discussionUrl;
}

watchEffect(async () => {
  loading.value = true;
  discussions.value = [];
  try {
    discussions.value = await getOrganizationDiscussions(props.oid);
  } finally {
    loading.value = false;
  }
  for (const discussion of discussions.value) {
    if(!(discussion.subject.id in subjectPromises.value)) {
      subjectPromises.value[discussion.subject.id] = getSubject(discussion.subject);
      const subject = await subjectPromises.value[discussion.subject.id];
      subjects.value[discussion.subject.id] = subject;
    }
  }
});
</script>
