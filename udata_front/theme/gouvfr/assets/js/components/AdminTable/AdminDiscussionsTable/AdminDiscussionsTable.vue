<template>
  <AdminTable class="fr-table--layout-fixed" :loading>
    <thead>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'title', direction)"
        :sorted="sorted('title')"
        scope="col"
      >
        {{ t("Discussion") }}
      </AdminTableTh>
      <AdminTableTh scope="col">
        {{ t("Number of comments") }}
      </AdminTableTh>
      <AdminTableTh scope="col">
        {{ t("Last comment") }}
      </AdminTableTh>
      <AdminTableTh
        @sort="(direction: SortDirection) => $emit('sort', 'closed', direction)"
        :sorted="sorted('closed')"
        scope="col"
      >
        {{ t("Closed at") }}
      </AdminTableTh>
      <AdminTableTh scope="col" style="width: 25%;">
        {{ t("Link to the discussion") }}
      </AdminTableTh>
    </thead>
    <tbody>
      <tr v-for="discussion in discussions">
        <td>
          <p class="fr-text--bold">
            <TextClamp
              :text="discussion.title"
              :auto-resize="true"
              :max-lines="1"
            />
          </p>
          <p v-if="subjects[discussion.subject.id]">
            <a
              class="fr-link inline-flex"
              :href="subjects[discussion.subject.id]?.page"
            >
              <Vicon :height="12" class="self-center" :name="subjects[discussion.subject.id]?.icon"/>
              <TextClamp
                class="overflow-wrap-anywhere"
                :text="subjects[discussion.subject.id]?.title"
                :auto-resize="true"
                :max-lines="1"
              />
            </a>
          </p>
        </td>
        <td>
          {{  discussion.discussion.length  }}
        </td>
        <td>
          <div>
            <p>{{ formatDate(getLastComment(discussion).posted_on) }}</p>
            <p class="inline-flex items-center">
              {{ t('by ') }}
              <AvatarWithName class="fr-ml-1v" :user="getLastComment(discussion).posted_by" />
            </p>
          </div>
        </td>
        <td>
          <template v-if="discussion.closed">{{ formatDate(discussion.closed) }}</template></td>
        <td>
          <a
            v-if="subjects[discussion.subject.id]"
            class="fr-link inline-flex"
            :href="getDiscussionUrl(discussion.id, subjects[discussion.subject.id])"
            target="_blank"
          >
            <TextClamp
              :text="getDiscussionUrl(discussion.id, subjects[discussion.subject.id])"
              :auto-resize="true"
              :max-lines="1"
            />
          </a>
        </td>
      </tr>
    </tbody>
  </AdminTable>
</template>
<script setup lang="ts">
import { AvatarWithName, formatDate } from "@datagouv/components/ts";
import { OhVueIcon as Vicon } from "oh-vue-icons";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import TextClamp from "vue3-text-clamp";
import { formatSubject, getSubject, SubjectSummary } from "../../../api/discussions";
import AdminTable from "../Table/AdminTable.vue";
import AdminTableTh from "../Table/AdminTableTh.vue";
import type { Comment, DiscussionSortedBy, DiscussionSubjectTypes, SortDirection, Thread } from '../../../types';

const props = defineProps<{
  discussions: Array<Thread>;
  loading: boolean;
  sortDirection: SortDirection;
  sortedBy: DiscussionSortedBy;
}>();

defineEmits<{
  (event: 'sort', column: DiscussionSortedBy, direction: SortDirection): void;
}>();

const { t } = useI18n();

const subjectPromises = ref<Record<string, Promise<DiscussionSubjectTypes | null>>>({});
const subjects = ref<Record<string, SubjectSummary | null>>({});

watchEffect(async () => {
  for (const discussion of props.discussions) {
    if(!(discussion.subject.id in subjectPromises.value)) {
      const subjectPromise = getSubject(discussion.subject);
      subjectPromises.value[discussion.subject.id] = subjectPromise;
      const subject = await subjectPromises.value[discussion.subject.id];
      subjects.value[discussion.subject.id] = formatSubject(subject, discussion.subject.class);
    }
  }
});

function getDiscussionUrl(discussionId: string, subject: SubjectSummary | null) {
  if(!subject) {
    return "";
  }
  return subject.page + "#/discussions/" + discussionId;
}

function sorted(column: DiscussionSortedBy) {
  if(props.sortedBy === column) {
    return props.sortDirection;
  }
  return null;
}

function getLastComment(discussion: Thread): Comment {
  return discussion.discussion.slice(-1)[0];
}
</script>
