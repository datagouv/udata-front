<template>
  <article>
    <header
      class="fr-py-2w fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between border-bottom border-default-grey"
      :id="resourceHeaderId"
    >
      <div class="fr-col-auto fr-grid-row fr-grid-row--top no-wrap">
        <div class="fr-col-auto fr-mx-2w fr-icon-svg fr-icon--sm" v-html="resourceImage"></div>
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
          <li class="text-default-error fr-ml-3v" v-if="unavailable">
            {{$t('Unavailable')}}
          </li>
          <li class="fr-col-auto fr-ml-3v" v-if="canEdit">
            <EditButton
              :dataset-id="datasetId"
              :resource-id="resource.id"
              :is-community-resource="isCommunityResource"
            />
          </li>
          <li class="fr-col-auto fr-ml-3v">
            <button
              @click="expand"
              role="button"
              :aria-expanded="expanded"
              :aria-controls="resourceContentId"
              class="fr-btn fr-btn--sm"
              :class="{'fr-btn--tertiary fr-icon-close-line': expanded, 'fr-btn--icon-left fr-icon-eye-line': !expanded}"
            >
              {{expanded ? $t('Close details') : $t('See data')}}
            </button>
          </li>
          <li class="fr-col-auto fr-ml-3v" v-if="resource.format === 'url'">
            <a
              :href="resource.latest"
              :title="$t('Resource link')"
              rel="nofollow"
              target="_blank"
              class="fr-btn fr-btn--sm fr-icon-external-link-line"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-ml-3v" v-else>
            <a
              :href="resource.latest"
              :title="$t('Download resource')"
              download
              class="fr-btn fr-btn--sm fr-icon-download-line"
            >
            </a>
          </li>
        </ul>
      </div>
    </header>
    <section
      class="accordion-content fr-p-0 border-default-grey"
      :class="{'border-bottom': expanded}"
      :aria-labelledby="resourceTitleId"
      :id="resourceContentId"
      ref="content"
    >
      <div class="fr-tabs fr-tabs--no-border fr-my-5v">
        <ul class="fr-tabs__list" role="tablist" :aria-label="$t('Resource menu')">
          <li role="presentation">
            <button :id="resourcePreviewButtonId" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" :aria-controls="resourcePreviewTabId">{{$t('Preview')}}</button>
          </li>
          <li role="presentation">
            <button :id="resourceInformationsButtonId" class="fr-tabs__tab" :tabindex="resourceInformationsTabIndex" role="tab" :aria-selected="resourceInformationsSelectedTab" :aria-controls="resourceInformationsTabId">{{$t('Informations')}}</button>
          </li>
        </ul>
        <div :id="resourcePreviewTabId" class="fr-tabs__panel fr-p-0 fr-tabs__panel--selected" role="tabpanel" :aria-labelledby="resourcePreviewButtonId" tabindex="0">
          <iframe v-if="resource.preview_url" :src="resource.preview_url" width="100%" height="600" frameborder="0" :title="$t('Preview of resource X', {title: resource.title})"></iframe>
          <component v-for="ex in explore" :is="ex" :resource="resource"/>
          <component :is="Preview" :resource="resource"/>
        </div>
        <div :id="resourceInformationsTabId" class="fr-tabs__panel" role="tabpanel" :aria-labelledby="resourceInformationsButtonId" tabindex="0">
          <div class="fr-mt-0 markdown" v-if="resource.description" v-html="filters.markdown(resource.description)">
          </div>
          <div class="fr-grid-row fr-grid-row--gutters">
            <DescriptionList>
              <DescriptionTerm>{{ $t('URL') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false" class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col text-overflow-ellipsis">
                  {{resource.url}}
                </div>
                <div class="fr-col-auto">
                  <CopyButton :text="resource.url"/>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('Permalink') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false" class="fr-grid-row fr-grid-row--middle">
                <div class="fr-col text-overflow-ellipsis">
                  {{resource.latest}}
                </div>
                <div class="fr-col-auto">
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
              <DescriptionTerm>{{ $t('MIME Type') }}</DescriptionTerm>
              <DescriptionDetails>
                {{resource.mime}}
              </DescriptionDetails>
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
            <h5 class="fr-h5 fr-mt-1w fr-mb-5v">{{$t('Schema')}}</h5>
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
import Preview from './preview.vue';
import { toggleAccordion } from "../../vanilla/accordion";
import DescriptionDetails from "../../utils/description-list/description-details.vue";
import DescriptionList from "../../utils/description-list/description-list.vue";
import DescriptionTerm from "../../utils/description-list/description-term.vue";
import useSchema from "../../../composables/useSchema";
import { getRegisteredComponentsForHook } from "udata-front";

export default defineComponent({
  components: {DescriptionDetails, DescriptionList, DescriptionTerm, CopyButton, EditButton, SchemaLoader, Preview},
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
    const filters = inject('$filters');
    /** @type {import("vue").Ref<HTMLElement | undefined>} */
    const content = ref();
    const expanded = ref(false);
    const expand = () => {
      expanded.value = !expanded.value;
      if(content.value) {
        toggleAccordion(content.value, expanded.value, 24);
      }
    }
    const availabilityChecked = computed(() => props.resource.extras && props.resource.extras['check:status']);
    const lastUpdate = computed(() => props.resource.published > props.resource.last_modified ? props.resource.published : props.resource.last_modified);
    const unavailable = computed(() => availabilityChecked.value && availabilityChecked.value >= 400);
    const { authorizeValidation, documentationUrl, loading, validationUrl} = useSchema(props.resource);
    const resourceContentId = computed(() => 'resource-' + props.resource.id);
    const resourceHeaderId = computed(() => 'resource-' + props.resource.id + '-header');
    const resourceInformationsButtonId = computed(() => 'resource-' + props.resource.id + '-informations-button');
    const resourceInformationsTabId = computed(() => 'resource-' + props.resource.id + '-informations-tab');
    const resourcePreviewButtonId = computed(() => 'resource-' + props.resource.id + '-preview-button');
    const resourcePreviewTabId = computed(() => 'resource-' + props.resource.id + '-preview-tab');
    const resourceTitleId = computed(() => 'resource-' + props.resource.id + '-title');
    const resourceInformationsSelectedTab = computed(() => !props.resource.preview_url);
    const resourceInformationsTabIndex = computed(() => props.resource.preview_url? -1 : 0);
    const explore = getRegisteredComponentsForHook("explore");

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
      Preview,
    }
  },
});
</script>
