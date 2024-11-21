<template>
<section ref="top" v-if="resourceId">
  <transition mode="out-in">
    <div v-if="loading">
      <ResourceAccordionLoader />
    </div>
    <div v-else>
      <Well type="secondary" color="success" class="fr-mb-2w">
        <div class="fr-grid-row fr-grid-row--middle justify-between">
          <span v-if="communityResource">{{ t("You are seeing a specific community resource of this dataset") }}</span>
          <span v-else>{{ t("You are seeing a specific file of this dataset") }}</span>
          <button class="fr-btn--close fr-btn fr-mr-0" @click.prevent="resetHash">
            {{ t('Close') }}
          </button>
        </div>
      </Well>
      <ResourceAccordion
        v-if="resource"
        :id="'resource-' + resourceId"
        :datasetId="datasetId"
        :expandedOnMount="true"
        :resource="resource"
        :canEdit="canEdit"
        :isCommunityResource="communityResource"
      />
    </div>
  </transition>
</section>
</template>
<script setup lang="ts">
import { ResourceAccordion, ResourceAccordionLoader, type Resource, Well } from "@datagouv/components/ts";
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { useToast } from "../../../composables/useToast";
import { getResourceIdFromHash } from '../../../helpers';
import { api } from "../../../plugins/api";
import { useHash, resetHash } from "../../../composables/useHash";

const props = withDefaults(defineProps<{
  canEdit: boolean;
  datasetId: string;
  communityResource?: boolean;
}>(), {
  communityResource: false,
});

const { t } = useI18n();
const { toast } = useToast();

const top = ref<HTMLElement | null>(null);
const resource = ref<Resource | null>(null);
const loading = ref(false);

const { hash } = useHash();
const resourceId = computed(() => getResourceIdFromHash(hash.value, props.communityResource));

const apiUrl = computed(() => {
  if (props.communityResource) {
    return `/datasets/community_resources/${resourceId.value}`;
  } else {
    return `/datasets/${props.datasetId}/resources/${resourceId.value}`;
  }
});

watchEffect(async () => {
  if (!resourceId.value) return;

  loading.value = true;
  try {
    const response = await api.get(apiUrl.value);
    const data = await response.data;
    if (data) {
      resource.value = data;
      if (top.value) top.value.scrollIntoView()
    }
  } catch (e) {
    console.error(e);
    toast.error(
      t("An error occurred while fetching the file ") + resourceId.value
    );
  } finally {
    loading.value = false;
  }
});
</script>
