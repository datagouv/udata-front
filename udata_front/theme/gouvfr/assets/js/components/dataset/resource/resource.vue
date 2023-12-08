<template>
  <article :class="{'drop-shadow': expanded}">
    <header
      class="fr-p-5v fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between border-default-grey"
      :class="{'border-bottom': !expanded}"
      :id="resourceHeaderId"
    >
      <div class="fr-col-auto fr-grid-row fr-grid-row--top no-wrap">
        <div class="fr-col-auto fr-mr-2w fr-icon-svg fr-icon--sm">
          <img :src="resourceImage" alt="" />
        </div>
        <div class="fr-col-auto">
          <h4
            class="fr-mb-1v"
            :id="resourceTitleId"
          >
            {{ resource.title || $t('Nameless file') }}
          </h4>
          <div class="fr-my-0 text-grey-380 fr-grid-row fr-grid-row--middle">
            <p v-if="hasSchema" class="fr-tag fr-tag--sm z-2">
              <strong class="fr-mr-1v">{{ $t("schema:") }}</strong>{{resource.schema.name ? resource.schema.name : resource.schema.url}}
            </p>
            <p
              v-if="hasSchema && hasSchemaErrors"
              class="fr-tag fr-tag--error fr-tag--on-right fr-tag--sm fr-ml-n3v fr-pl-2w fr-icon-error-line fr-tag--icon-left"
            >
              {{ $t("Invalid") }}
            </p>
            <p :class="{'dash-before': hasSchema}" class="fr-text--xs fr-m-0 dash-after">{{ $t('Updated {date}', {date: formatRelativeIfRecentDate(lastUpdate)}) }}</p>
            <p v-if="resource.format" class="fr-text--xs fr-m-0 dash-after">
              {{ resource.format?.trim()?.toLowerCase() }}
              <template v-if="resource.filesize">({{ filesize(resource.filesize) }})</template>
            </p>
            <p class="fr-text--xs fr-m-0">{{ $t('X downloads', resource.metrics.views || 0) }}</p>
          </div>
          <p class="fr-mb-0 fr-mt-1v fr-text--xs text-grey-380" v-if="isCommunityResource && (resource.organization || resource.owner)">
            {{ $t('From') }}
            <a class="fr-link" :href="resource.organization.page" v-if="resource.organization">
              <OrganizationNameWithCertificate :organization="resource.organization" />
            </a>
            <template v-else-if="owner">{{owner}}</template>
          </p>
        </div>
      </div>
      <div class="fr-col-auto fr-ml-auto">
        <div class="fr-grid-row fr-grid-row--middle no-wrap wrap-md">
          <p class="text-default-warning fr-m-0" v-if="unavailable">
            {{$t('Unavailable')}}
          </p>
          <p class="fr-col-auto fr-ml-3v fr-m-0">
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
          </p>
          <p class="fr-col-auto fr-ml-3v fr-m-0" v-if="resource.format === 'url'">
            <a
              :href="resource.latest"
              :title="$t('File link - opens a new window')"
              rel="nofollow noopener"
              target="_blank"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-external-link-line fr-icon--sm"
            >
            </a>
          </p>
          <p class="fr-col-auto fr-ml-3v fr-m-0" v-else>
            <a
              :href="resource.latest"
              :title="$t('Download file')"
              download
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-download-line fr-icon--sm matomo_download"
            >
            </a>
          </p>
          <p class="fr-col-auto fr-ml-3v fr-m-0" v-if="canEdit">
            <EditButton
              :dataset-id="datasetId"
              :resource-id="resource.id"
              :is-community-resource="isCommunityResource"
            />
          </p>
        </div>
      </div>
    </header>
    <section
      class="accordion-content"
      :aria-labelledby="resourceTitleId"
      :id="resourceContentId"
      ref="content"
    >
      <div class="fr-tabs fr-tabs--no-border fr-mt-1v">
        <ul class="fr-tabs__list" role="tablist" :aria-label="$t('File menu')">
          <template v-if="hasExplore">
            <li role="presentation">
              <button
                :id="resourcePreviewButtonId"
                class="fr-tabs__tab"
                tabindex="0"
                role="tab"
                aria-selected="true"
                :aria-controls="resourcePreviewTabId"
                @click="registerEvent(resourcePreviewButtonId)"
              >
                {{$t('Preview')}}
              </button>
            </li>
            <li role="presentation">
              <button
                :id="resourceStructureButtonId"
                class="fr-tabs__tab"
                tabindex="0"
                role="tab"
                aria-selected="false"
                :aria-controls="resourceStructureTabId"
                @click="registerEvent(resourceStructureButtonId)"
              >
                {{$t('Data structure')}}
              </button>
            </li>
          </template>
          <li role="presentation">
            <button
              :id="resourceInformationButtonId"
              class="fr-tabs__tab"
              :tabindex="resourceInformationTabIndex"
              role="tab"
              :aria-selected="resourceInformationSelectedTab"
              :aria-controls="resourceInformationTabId"
              @click="registerEvent(resourceInformationButtonId)"
            >
              {{$t('Metadata')}}
            </button>
          </li>
        </ul>
        <div
          :id="resourcePreviewTabId"
          class="fr-tabs__panel fr-tabs__panel--selected fr-tabs__panel--no-padding fr-table--dense"
          role="tabpanel"
          :aria-labelledby="resourcePreviewButtonId"
          tabindex="0"
          v-if="hasExplore"
        >
          <component v-if="expanded" v-for="ex in explore" :is="ex.component" :resource="resource"/>
        </div>
        <div
          :id="resourceStructureTabId"
          class="fr-tabs__panel fr-tabs__panel--selected"
          role="tabpanel"
          :aria-labelledby="resourceStructureButtonId"
          tabindex="0"
          v-if="hasExplore || hasSchema"
        >
          <component v-if="expanded" v-for="dataStructure in structure" :is="dataStructure.component" :resource="resource"/>
          <hr class="fr-my-5v fr-p-1v" v-if="hasExplore && hasSchema"/>
          <template v-if="hasSchema">
            <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div class="fr-col-12 fr-col-lg">
                <h5 class="fr-h6 fr-mb-5v">{{$t('Data schema')}}</h5>
                <ul class="fr-tags-group" v-if="hasSchemaErrors">
                  <li v-for="[key, schemaError] in schemaReport">
                    <p class="fr-tag fr-tag--sm">{{schemaError.name}}</p>
                  </li>
                </ul>
                <template v-else>
                  <div class="fr-grid-row fr-grid-row--middle fr-mb-1w">
                    <p class="fr-text--xs fr-m-0">{{$t('This file is following a schema: ')}}</p>
                    <p class="fr-tag fr-tag--sm fr-icon-checkbox-circle-line fr-tag--icon-left">
                      {{resource.schema.name ? resource.schema.name : resource.schema.url}}
                    </p>
                  </div>
                    <i18n-t keypath="Schemas allow to describe data models, discover how schemas improve your data quality and the available use cases on {address}" class="fr-text--xs fr-m-0" tag="p" scope="global">
                      <template #address>
                        <a :href="schema_documentation_url">schema.data.gouv.fr</a>
                      </template>
                    </i18n-t>
                </template>
              </div>
              <div class="fr-col-auto">
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
                    v-if="resource.schema?.name"
                    class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-left fr-icon-book-2-line"
                    :href="documentationUrl"
                  >
                    {{ $t('See schema documentation') }}
                  </a>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div :id="resourceInformationTabId" class="fr-tabs__panel" role="tabpanel" :aria-labelledby="resourceInformationButtonId" tabindex="0">
          <div class="fr-grid-row fr-grid-row--gutters">
            <DescriptionList>
              <DescriptionTerm>{{ $t('URL') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false">
                <div class="fr-col text-overflow-ellipsis">
                  <a :href="resource.url">{{resource.url}}</a>
                </div>
                <div class="fr-ml-1w fr-col-auto">
                  <CopyButton :text="resource.url"/>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('Permalink') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false">
                <div class="fr-col text-overflow-ellipsis">
                  <a :href="resource.latest">{{resource.latest}}</a>
                </div>
                <div class="fr-ml-1w fr-col-auto">
                  <CopyButton :text="resource.latest"/>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('ID') }}</DescriptionTerm>
              <DescriptionDetails :withEllipsis="false">
                <div class="fr-col text-overflow-ellipsis">
                  {{ resource.id }}
                </div>
                <div class="fr-ml-1w fr-col-auto">
                  <CopyButton :text="resource.id"/>
                </div>
              </DescriptionDetails>
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
                {{formatDate(resource.created_at)}}
              </DescriptionDetails>
              <DescriptionTerm>{{ $t('Modified on') }}</DescriptionTerm>
              <DescriptionDetails>
                {{formatDate(resource.last_modified)}}
              </DescriptionDetails>
              <template v-if="resource.checksum">
                <DescriptionTerm>{{resource.checksum.type}}</DescriptionTerm>
                <DescriptionDetails :withEllipsis="false">
                  <div class="fr-col text-overflow-ellipsis">
                    {{resource.checksum.value}}
                  </div>
                  <div class="fr-col-auto">
                    <CopyButton :text="resource.checksum.value"/>
                  </div>
                </DescriptionDetails>
              </template>
            </DescriptionList>
            <DescriptionList>
              <template v-if="resource.filesize">
                <DescriptionTerm>{{ $t('Size') }}</DescriptionTerm>
                <DescriptionDetails>
                  {{ filesize(resource.filesize) }}
                </DescriptionDetails>
              </template>
            </DescriptionList>
            <div class="fr-col-auto fr-ml-auto">
              <button
                :id="resourceCopyId"
                :data-clipboard-text="resourceExternalUrl"
                class="fr-btn fr-btn--sm fr-btn--secondary fr-btn--secondary-grey-500 fr-btn--icon-right fr-icon-links-fill"
              >
                {{$t('Copy resource permalink')}}
            </button>
            </div>
          </div>
          <template v-if="resource.description">
            <h5 class="fr-text--sm fr-my-0 fr-text--bold">
              {{ $t("File description") }}
            </h5>
            <div class="fr-mt-0 markdown fr-text--sm text-mention-grey" v-html="markdown(resource.description)">
            </div>
          </template>
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
import { defineComponent, ref, computed, unref, onMounted } from "vue";
import SchemaLoader from "./schema-loader.vue";
import useOwnerName from "../../../composables/useOwnerName";
import useResourceImage from "../../../composables/useResourceImage";
import CopyButton from "../../utils/copy-button.vue";
import EditButton from "./edit-button.vue";
import { toggleAccordion } from "../../vanilla/accordion";
import DescriptionDetails from "../../utils/description-list/description-details.vue";
import DescriptionList from "../../utils/description-list/description-list.vue";
import DescriptionTerm from "../../utils/description-list/description-term.vue";
import OrganizationNameWithCertificate from "../../organization/organization-name-with-certificate.vue";
import useSchema from "../../../composables/useSchema";
import useComponentsForHook from "../../../composables/useComponentsForHook";
import { explorable_resources, schema_documentation_url } from "../../../config";
import { filesize, formatRelativeIfRecentDate, formatDate, markdown } from "../../../helpers";

export default defineComponent({
  components: { DescriptionDetails, DescriptionList, DescriptionTerm, CopyButton, EditButton, OrganizationNameWithCertificate, SchemaLoader },
  inheritAttrs: false,
  props: {
    datasetId: {
      type: String,
      required: true,
    },
    expandedOnMount: {
      type: Boolean,
      default: false,
    },
    isCommunityResource: {
      type: Boolean,
      default: false,
    },
    resource: {
      /** @type {import("vue").PropType<import("../../../api/resources").Resource>} */
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

    /** @type {import("vue").Ref<HTMLElement | undefined>} */
    const content = ref();

    const expanded = ref(false);
    const expand = () => {
      if(expanded.value) {
        globalThis._paq?.push(['trackEvent', 'Close resource', props.resource.id]);
      } else {
        globalThis._paq?.push(['trackEvent', 'Open resource', props.resource.id]);
        if(hasExplore.value) {
          registerEvent(resourcePreviewButtonId);
        } else if (hasSchema.value) {
          registerEvent(resourceStructureButtonId);
        } else {
          registerEvent(resourceInformationButtonId);
        }
      }
      expanded.value = !expanded.value;
      if(content.value) {
        toggleAccordion(content.value, expanded.value);
      }
    }

    /**
     *
     * @param {import("vue").ComputedRef<string> | string} tab Tab name
     */
    const registerEvent = (tab) => {
      const tabName = unref(tab);
      globalThis._paq?.push(['trackEvent', 'View resource tab', props.resource.id, tab]);
      if(tabName === resourcePreviewButtonId.value) {
        globalThis._paq?.push(['trackEvent', 'Show preview', props.resource.id]);
      } else if (tabName === resourceStructureButtonId.value) {
        globalThis._paq?.push(['trackEvent', 'Show data structure', props.resource.id]);
      }
    }

    const availabilityChecked = computed(() => props.resource.extras && props.resource.extras['check:available']);
    const lastUpdate = computed(() => props.resource.last_modified);
    const unavailable = computed(() => availabilityChecked.value === false);
    const { authorizeValidation, documentationUrl, loading, validationUrl, schemaReport} = useSchema(props.resource);
    const hasSchema = computed(() => !!props.resource.schema.name || !!props.resource.schema.url);
    const hasSchemaErrors = computed(() => !!schemaReport.value.size);
    const explore = getComponentsForHook("explore");
    const structure = getComponentsForHook("data-structure");
    const hasExplore = computed(() => explore.length > 0 && explorable_resources && explorable_resources.includes(props.resource.id));
    const resourceContentId = computed(() => 'resource-' + props.resource.id);
    const resourceHeaderId = computed(() => 'resource-' + props.resource.id + '-header');
    const resourceInformationButtonId = computed(() => 'resource-' + props.resource.id + '-information-button');
    const resourceInformationTabId = computed(() => 'resource-' + props.resource.id + '-information-tab');
    const resourceStructureButtonId = computed(() => 'resource-' + props.resource.id + '-structure-button');
    const resourceStructureTabId = computed(() => 'resource-' + props.resource.id + '-structure-tab');
    const resourcePreviewButtonId = computed(() => 'resource-' + props.resource.id + '-preview-button');
    const resourcePreviewTabId = computed(() => 'resource-' + props.resource.id + '-preview-tab');
    const resourceTitleId = computed(() => 'resource-' + props.resource.id + '-title');
    const resourceCopyId = computed(() => 'resource-' + props.resource.id + '-copy');
    const resourceExternalUrl = computed(() => {
      let hash = "#/resources/" + props.resource.id;
      return window.location.origin + window.location.pathname + hash;
    });
    const resourceInformationSelectedTab = computed(() => !hasExplore.value);
    const resourceInformationTabIndex = computed(() => hasExplore.value ? -1 : 0);

    onMounted(() => {
      if(props.expandedOnMount) {
        expand();
      }
    });

    return {
      registerEvent,
      owner,
      resourceImage,
      filesize,
      formatRelativeIfRecentDate,
      formatDate,
      markdown,
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
      resourceCopyId,
      resourceExternalUrl,
      resourceHeaderId,
      resourceInformationButtonId,
      resourceInformationTabId,
      resourcePreviewButtonId,
      resourcePreviewTabId,
      resourceTitleId,
      resourceStructureButtonId,
      resourceStructureTabId,
      resourceInformationSelectedTab,
      resourceInformationTabIndex,
      explore,
      hasExplore,
      structure,
      schemaReport,
      hasSchema,
      hasSchemaErrors,
      schema_documentation_url,
    }
  },
});
</script>
