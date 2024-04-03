<template>
<section ref="top" v-if="resourceId">
  <transition mode="out-in">
    <div v-if="loading">
      <ResourceAccordionLoader />
    </div>
    <div v-else>
      <Well type="secondary" color="success" class="fr-mb-2w">
        <div class="fr-grid-row fr-grid-row--middle justify-between">
          {{ t("You are seeing a specific file of this dataset") }}
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
      />
    </div>
  </transition>
</section>
</template>
<script lang="ts">
import { ResourceAccordion, ResourceAccordionLoader, type Resource, Well } from "@etalab/data.gouv.fr-components";
import { defineComponent, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import { useToast } from "../../../composables/useToast";
import useIdFromHash from "../../../composables/useIdFromHash";
import { previousResourceUrlRegExp, resourceUrlRegExp } from '../../../helpers';
import { api } from "../../../plugins/api";

export default defineComponent({
  components: { ResourceAccordion, ResourceAccordionLoader, Well },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    datasetId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { toast } = useToast();

    const resource = ref<Resource | null>(null);
    const loading = ref(true);

    const { id: resourceId, resetHash } = useIdFromHash([resourceUrlRegExp, previousResourceUrlRegExp]);

    const top = ref<HTMLElement | null>(null);

    const loadFileFromHash = () => {
      if(!resourceId.value) return;
      loading.value = true;

      // Scroll the resource block into view.
      setTimeout(
        () => {
          if(top.value) {
            top.value.scrollIntoView({ behavior: "smooth" })
          }
        },
        500
      );

      return api
        .get(`/datasets/${props.datasetId}/resources/${resourceId.value}`)
        .then((resp) => resp.data)
        .then((data) => {
          if (data) {
            resource.value = data;
          }
        })
        .catch(() => {
          toast.error(
            t("An error occurred while fetching the file ") + resourceId.value
          );
        })
        .finally(() => {
          loading.value = false;
        });
    };

    watchEffect(() => {
      if (resourceId.value) {
        loadFileFromHash();
      }
    });

    return {
      loading,
      resource,
      resourceId,
      top,
      resetHash,
      t,
    }
  },
});
</script>
