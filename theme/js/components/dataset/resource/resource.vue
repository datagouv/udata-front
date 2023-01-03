<template>
  <article :class="{'drop-shadow': expanded}">
    <header
      class="fr-p-5v fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between border-bottom border-default-grey"
      :id="resourceHeaderId"
    >
      <div class="fr-col-auto fr-grid-row fr-grid-row--top no-wrap">
        <div class="fr-col-auto fr-mr-2w fr-icon-svg fr-icon--sm">
          <img :src="resourceImage" alt="" />
        </div>
        <div class="fr-col-auto">
          <div class="fr-grid-row fr-grid-row--middle fr-mb-1v">
            <h4
              class="fr-mb-0"
              :id="resourceTitleId"
            >
              {{ resource.title || $t('Nameless resource') }}
            </h4>
            <p v-if="resource.schema?.name" class="fr-ml-1w fr-tag fr-tag--sm fr-icon-checkbox-circle-line fr-tag--icon-left">
                {{resource.schema.name}}
            </p>
          </div>
          <div class="fr-text--sm fr-my-0 text-grey-380">
            <template v-if="resource.owner">
              {{ $t('From') }} {{owner}} —
            </template>
            <template v-else-if="resource.organization">
              {{ $t('From') }} <a :href="resource.organization.page">{{ owner }}</a> —
            </template>
            {{$t('Updated on X', {date: filters.formatDate(lastUpdate)})}} —
            <template v-if="resource.format">
              {{ resource.format?.trim()?.toLowerCase() }}
              <template v-if="resource.filesize">({{ filters.filesize(resource.filesize) }})</template> —
            </template>
            {{ $t('X downloads', resource.metrics.views || 0) }}
          </div>
        </div>
      </div>
      <div class="fr-col-auto fr-ml-auto">
        <ul class="fr-grid-row fr-grid-row--middle no-wrap wrap-md">
          <li class="text-default-error" v-if="unavailable">
            {{$t('Unavailable')}}
          </li>
          <li class="fr-col-auto fr-ml-3v">
            <button
              @click="expand"
              role="button"
              :aria-expanded="expanded"
              :aria-controls="resourceContentId"
              class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-btn--secondary-grey-500"
              :class="{'fr-icon-arrow-up-s-line': expanded, 'fr-icon-arrow-down-s-line': !expanded}"
            >
              <template v-if="expanded">
                {{ $t('Close details') }}
              </template>
              <template v-else>
                {{hasExplore ? $t('See data') : $t('See metadata')}}
              </template>
            </button>
          </li>
          <li class="fr-col-auto fr-ml-3v" v-if="resource.format === 'url'">
            <a
              :href="resource.latest"
              :title="$t('Resource link')"
              rel="nofollow"
              target="_blank"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-external-link-line fr-icon--sm"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-ml-3v" v-else>
            <a
              :href="resource.latest"
              :title="$t('Download resource')"
              download
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-download-line fr-icon--sm"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-ml-3v" v-if="canEdit">
            <EditButton
              :dataset-id="datasetId"
              :resource-id="resource.id"
              :is-community-resource="isCommunityResource"
            />
          </li>
        </ul>
      </div>
    </header>
    <section
      class="accordion-content border-default-grey"
      :class="{'border-bottom': expanded}"
      :aria-labelledby="resourceTitleId"
      :id="resourceContentId"
      ref="content"
    >
      <div class="fr-tabs fr-tabs--no-border fr-my-5v">
        <ul class="fr-tabs__list" role="tablist" :aria-label="$t('Resource menu')">
          <template v-if="hasExplore">
            <li role="presentation">
              <button :id="resourcePreviewButtonId" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" :aria-controls="resourcePreviewTabId">{{$t('Preview')}}</button>
            </li>
            <li role="presentation">
              <button :id="resourceStructureButtonId" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="false" :aria-controls="resourceStructureTabId">{{$t('Data structure')}}</button>
            </li>
          </template>
          <li role="presentation">
            <button :id="resourceInformationsButtonId" class="fr-tabs__tab" :tabindex="resourceInformationsTabIndex" role="tab" :aria-selected="resourceInformationsSelectedTab" :aria-controls="resourceInformationsTabId">{{$t('Informations')}}</button>
          </li>
        </ul>
        <div
          :id="resourcePreviewTabId"
          class="fr-tabs__panel fr-p-0-5v fr-tabs__panel--selected fr-tabs__panel--no-padding"
          role="tabpanel"
          :aria-labelledby="resourcePreviewButtonId"
          tabindex="0"
          v-if="hasExplore"
        >
          <component v-if="expanded" v-for="ex in explore" :is="ex.component" :resource="resource"/>
        </div>
        <div :id="resourceInformationsTabId" class="fr-tabs__panel" role="tabpanel" :aria-labelledby="resourceInformationsButtonId" tabindex="0">
          <div class="fr-grid-row fr-grid-row--gutters">
            <DescriptionList>
              <DescriptionTerm>{{ $t('URL') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false" class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col text-overflow-ellipsis">
                  <a :href="resource.url">{{resource.url}}</a>
                </div>
                <div class="fr-ml-1w fr-col-auto">
                  <CopyButton :text="resource.url"/>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('Permalink') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false" class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col text-overflow-ellipsis">
                  <a :href="resource.latest">{{resource.latest}}</a>
                </div>
                <div class="fr-ml-1w fr-col-auto">
                  <CopyButton :text="resource.latest"/>
                </div>
              </DescriptionDetails>
              <template v-if="resource.checksum">
                <DescriptionTerm>{{resource.checksum.type}}</DescriptionTerm>
                <DescriptionDetails :withEllipsis="false" class="fr-grid-row fr-grid-row--middle">
                  <div class="fr-col text-overflow-ellipsis">
                    {{resource.checksum.value}}
                  </div>
                  <div class="fr-col-auto">
                    <CopyButton :text="resource.checksum.value"/>
                  </div>
                </DescriptionDetails>
              </template>
              <template v-if="resource.mime">
                <DescriptionTerm>{{ $t('MIME Type') }}</DescriptionTerm>
                <DescriptionDetails>
                  {{resource.mime}}
                </DescriptionDetails>
              </template>
            </DescriptionList>
            <DescriptionList>
              <DescriptionTerm>{{ $t('Created on') }}</DescriptionTerm>
              <DescriptionDetails>
                {{filters.formatDate(resource.created_at)}}
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('Modified on') }}</DescriptionTerm>
              <DescriptionDetails>
                {{filters.formatDate(resource.last_modified)}}
              </DescriptionDetails>
            </DescriptionList>
            <DescriptionList>
              <template v-if="resource.filesize">
                <DescriptionTerm>{{ $t('Size') }}</DescriptionTerm>
                <DescriptionDetails>
                  {{ filters.filesize(resource.filesize) }}
                </DescriptionDetails>
              </template>
            </DescriptionList>
          </div>
          <template v-if="resource.schema.name">
            <h5 class="fr-h6 fr-mt-1w fr-mb-5v">{{$t('Schema')}}</h5>
            <p class="fr-tag fr-tag--sm fr-icon-checkbox-circle-line fr-tag--icon-left fr-mb-2w">
              {{resource.schema.name}}
            </p>
            <div v-if="loading">
              <SchemaLoader/>
            </div>
            <div v-else>
              <a
                v-if="authorizeValidation"
                class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-mr-3v fr-btn--icon-left fr-icon-checkbox-line"
                :href="validationUrl"
              >
                {{ $t('See validation report') }}
              </a>
              <a
                class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-book-2-line"
                :href="documentationUrl"
              >
                {{ $t('See schema documentation') }}
              </a>
            </div>
          </template>
          <h5 class="fr-text--sm fr-my-0 fr-text--bold">
            {{ $t("File description") }}
          </h5>
          <div class="fr-mt-0 markdown" v-if="resource.description" v-html="filters.markdown(resource.description)">
          </div>
          <div class="text-align-right" v-if="!hasExplore && resource.preview_url">
            <a
              :href="resource.preview_url"
              class="fr-btn fr-btn--icon-left fr-icon-test-tube-line"
            >
              {{ $t("Explore data") }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { inject, defineComponent, ref, computed } from "vue";
import SchemaLoader from "./schema-loader.vue";
import useOwnerName from "../../../composables/useOwnerName";
import useResourceImage from "../../../composables/useResourceImage";
import CopyButton from "../../utils/copy-button.vue";
import EditButton from "./edit-button.vue";
import { toggleAccordion } from "../../vanilla/accordion";
import DescriptionDetails from "../../utils/description-list/description-details.vue";
import DescriptionList from "../../utils/description-list/description-list.vue";
import DescriptionTerm from "../../utils/description-list/description-term.vue";
import useSchema from "../../../composables/useSchema";
import useComponentsForHook from "../../../composables/useComponentsForHook";
import { explorable_resources } from "../../../config";

export default defineComponent({
  components: {DescriptionDetails, DescriptionList, DescriptionTerm, CopyButton, EditButton, SchemaLoader},
  inheritAttrs: false,
  props: {
    datasetId: {
      type: String,
      required: true,
    },
    isCommunityResource: {
      type: Boolean,
      default: false,
    },
    resource: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    typeLabel: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const owner = useOwnerName(props.resource);
    const resourceImage = useResourceImage(props.resource);
    const { getComponentsForHook } = useComponentsForHook();
    const filters = inject('$filters');
    /** @type {import("vue").Ref<HTMLElement | undefined>} */
    const content = ref();
    const expanded = ref(false);
    const expand = () => {
      expanded.value = !expanded.value;
      if(content.value) {
        toggleAccordion(content.value, expanded.value);
      }
    }
    const availabilityChecked = computed(() => props.resource.extras && props.resource.extras['check:status']);
    const lastUpdate = computed(() => props.resource.published > props.resource.last_modified ? props.resource.published : props.resource.last_modified);
    const unavailable = computed(() => availabilityChecked.value && availabilityChecked.value >= 400);
    const { authorizeValidation, documentationUrl, loading, validationUrl} = useSchema(props.resource);
    const explore = getComponentsForHook("explore");
    const hasExplore = computed(() => explore.length > 0 && explorable_resources && explorable_resources.includes(props.resource.id));
    const resourceContentId = computed(() => 'resource-' + props.resource.id);
    const resourceHeaderId = computed(() => 'resource-' + props.resource.id + '-header');
    const resourceInformationsButtonId = computed(() => 'resource-' + props.resource.id + '-informations-button');
    const resourceInformationsTabId = computed(() => 'resource-' + props.resource.id + '-informations-tab');
    const resourceStructureButtonId = computed(() => 'resource-' + props.resource.id + '-structure-button');
    const resourceStructureTabId = computed(() => 'resource-' + props.resource.id + '-structure-tab');
    const resourcePreviewButtonId = computed(() => 'resource-' + props.resource.id + '-preview-button');
    const resourcePreviewTabId = computed(() => 'resource-' + props.resource.id + '-preview-tab');
    const resourceTitleId = computed(() => 'resource-' + props.resource.id + '-title');
    const resourceInformationsSelectedTab = computed(() => !hasExplore.value);
    const resourceInformationsTabIndex = computed(() => hasExplore.value ? -1 : 0);

    return {
      owner,
      resourceImage,
      filters,
      content,
      expanded,
      expand,
      availabilityChecked,
      lastUpdate,
      unavailable,
      authorizeValidation,
      documentationUrl,
      loading,
      validationUrl,
      resourceContentId,
      resourceHeaderId,
      resourceInformationsButtonId,
      resourceInformationsTabId,
      resourcePreviewButtonId,
      resourcePreviewTabId,
      resourceTitleId,
      resourceInformationsSelectedTab,
      resourceInformationsTabIndex,
      explore,
      hasExplore,
    }
  },
});
</script>
