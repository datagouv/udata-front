<template>
<section ref="top" v-if="resourceId">
  <transition mode="out-in">
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <!-- TODO: move to <Well> component when available -->
        <div class="fr-mt-2w fr-px-3w well well-secondary-success">
          <div class="fr-grid-row fr-grid-row--middle justify-between">
            {{
              $t("You are seeing a specific file of this dataset")
            }}
            <button class="fr-btn--close fr-btn fr-mr-0" @click.prevent="resetHash">
              {{$t('Close')}}
            </button>
          </div>
        </div>
        <Resource
          :id="'resource-' + resourceId"
          :datasetId="datasetId"
          :resource="resource"
          :canEdit="canEdit"
          :typeLabel="typeLabel"
        />
      </div>
    </transition>
</section>
</template>
<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useI18n } from "vue-i18n";
import Loader from "./loader.vue";
import Resource from "./resource.vue";
import { useToast } from "../../../composables/useToast";
import useIdFromHash from "../../../composables/useIdFromHash";
import { previousUrlRegExp, urlRegExp } from '../../../helpers';
import { api } from "../../../plugins/api";

export default defineComponent({
  components: { Loader, Resource },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    datasetId: {
      type: String,
      required: true,
    },
    typeLabel: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {t} = useI18n();
    const toast = useToast();

    /** @type {import("vue").Ref<import("../../../api/resources").Resource | null>} */
    const resource = ref(null);
    const loading = ref(true);

    const { id: resourceId, resetHash } = useIdFromHash([urlRegExp, previousUrlRegExp]);

    /** @type {import("vue").Ref<HTMLElement | null>} */
    const top = ref(null);

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
    }
  },
});
</script>
