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
    <div class="fr-table">
      <table>
        <thead>
          <th>
            {{ t("Discussion") }}
          </th>
          <th>
            {{ t("Status") }}
          </th>
          <th>
            {{ t("Created at") }}
          </th>
          <th>
            {{ t("Closed at") }}
          </th>
          <th>
            {{ t("URL") }}
          </th>
        </thead>
        <tbody>
          <tr v-for="discussion in discussions">
            <td>
              <p class="fr-text--bold">{{ discussion.title }}</p>
              <p v-if="subjects[discussion.subject.id]">
                <a
                  class="fr-link"
                  :href="subjects[discussion.subject.id].page"
                >
                  <Vicon :name="getSubjectTypeIcon(discussion.subject)"/>
                  {{ getSubjectTitle(subjects[discussion.subject.id]) }}
                </a>
              </p>
            </td>
            <td>
              {{ discussion.closed ? "Closed" : "Public" }}
            </td>
            <td>{{ formatDate(discussion.created) }}</td>
            <td>
              <template v-if="discussion.closed">{{ formatDate(discussion.closed) }}</template></td>
            <td>{{ getDiscussionUrl(discussion.id) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '@datagouv/components';
import { OhVueIcon as Vicon } from "oh-vue-icons";
import { ref, watchPostEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { getOrganizationDiscussions, getSubject, getSubjectTitle, getSubjectTypeIcon } from '../../../api/discussions';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import { useCurrentOrganization } from '../../../composables/admin/useCurrentOrganization';
import { dataset_url } from '../../../config';
import type { DiscussionSubjectTypes, Thread } from "../../../types";

const { t } = useI18n();
const props = defineProps<{oid: string}>();

const discussions = ref<Array<Thread>>([]);
const subjectPromises = ref<Record<string, Promise<DiscussionSubjectTypes>>>({});
const subjects = ref<Record<string, DiscussionSubjectTypes>>({});

const { currentOrganization } = useCurrentOrganization();

function getDiscussionUrl(discussionId: string) {
  const discussionUrl = "discussions/" + discussionId;

  return window.location.origin + dataset_url + "#/" + discussionUrl;
}

watchPostEffect(async () => {
  discussions.value = await getOrganizationDiscussions(props.oid);
  for (const discussion of discussions.value) {
    if(!(discussion.subject.id in subjectPromises.value)) {
      subjectPromises.value[discussion.subject.id] = getSubject(discussion.subject);
      const subject = await subjectPromises.value[discussion.subject.id];
      subjects.value[discussion.subject.id] = subject;
    }
  }
});
</script>
