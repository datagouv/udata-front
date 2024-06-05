<template>
  <article :class="{'drop-shadow': expanded}">
    <header
      class="fr-p-5v fr-grid-row fr-grid-row--middle no-wrap wrap-md justify-between border-default-grey"
      :class="{'border-bottom': !expanded}"
      :id="resourceHeaderId"
    >
      <div class="fr-col-auto fr-grid-row fr-grid-row--top no-wrap">
        <div class="fr-col-auto fr-mr-2w fr-icon-svg fr-icon--sm">
          <img :src="url" alt="" />
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
              <strong class="fr-mr-1v">{{ $t("schema:") }}</strong>{{schemaName ? schemaName : schemaUrl}}
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
            <p class="fr-text--xs fr-m-0">{{ $t('{n} downloads', resource.metrics.views || 0) }}</p>
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
              data-testid="expand-button"
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
              rel="ugc nofollow noopener"
              target="_blank"
              class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500 fr-icon-external-link-line fr-icon--sm"
            >
            </a>
          </p>
          <p class="fr-col-auto fr-ml-3v fr-m-0" v-else>
            <a
              :href="resource.latest"
              rel="ugc nofollow noopener"
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
      ref="contentRef"
    >
      <div class="fr-tabs fr-tabs--no-border fr-mt-1v" ref="tabsRef">
        <ul class="fr-tabs__list" ref="tabListRef" role="tablist" :aria-label="$t('File menu')">
          <template v-if="hasExplore">
            <li role="presentation">
              <button
                :id="resourcePreviewButtonId"
                class="fr-tabs__tab"
                :tabindex="resourcePreviewTabIndex"
                role="tab"
                :aria-selected="resourcePreviewSelected"
                :aria-controls="resourcePreviewTabId"
                @click="selectTab(resourcePreviewIndex)"
              >
                {{$t('Preview')}}
              </button>
            </li>
          </template>
          <template v-if="hasExplore || hasSchema">
            <li role="presentation">
              <button
                :id="resourceStructureButtonId"
                class="fr-tabs__tab"
                :tabindex="resourceStructureTabIndex"
                role="tab"
                :aria-selected="resourceStructureSelected"
                :aria-controls="resourceStructureTabId"
                @click="selectTab(resourceStructureIndex)"
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
              :aria-selected="resourceInformationSelected"
              :aria-controls="resourceInformationTabId"
              @click="selectTab(resourceInformationIndex)"
            >
              {{$t('Metadata')}}
            </button>
          </li>
        </ul>
        <transition
          name="slide-fade"
          mode="in-out"
          v-if="hasExplore"
        >
          <div
            :id="resourcePreviewTabId"
            class="fr-tabs__panel fr-tabs__panel--no-padding fr-table--dense"
            :class="resourcePreviewClass"
            role="tabpanel"
            :aria-labelledby="resourcePreviewButtonId"
            :tabindex="resourcePreviewTabIndex"
            v-show="resourcePreviewSelected"
          >
            <component v-if="expanded" v-for="ex in explore" :is="ex.component" :resource="resource"/>
          </div>
        </transition>
        <transition
          name="slide-fade"
          mode="in-out"
          v-if="hasExplore || hasSchema"
        >
          <div
            :id="resourceStructureTabId"
            class="fr-tabs__panel"
            :class="resourceStructureClass"
            role="tabpanel"
            :aria-labelledby="resourceStructureButtonId"
            :tabindex="resourceStructureTabIndex"
            v-show="resourceStructureSelected"
          >
            <component v-if="expanded && hasExplore" v-for="dataStructure in structure" :is="dataStructure.component" :resource="resource"/>
            <hr class="fr-my-5v fr-p-1v" v-if="hasExplore && hasSchema"/>
            <template v-if="hasSchema">
              <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
                <div class="fr-col-12 fr-col-lg">
                  <h5 class="fr-h6 fr-mb-5v">{{$t('Data schema')}}</h5>
                  <ul class="fr-tags-group" v-if="hasSchemaErrors">
                    <li v-for="[_key, schemaError] in schemaReport">
                      <p class="fr-tag fr-tag--sm">{{schemaError.name}}</p>
                    </li>
                  </ul>
                  <template v-else>
                    <div class="fr-grid-row fr-grid-row--middle fr-mb-1w">
                      <p class="fr-text--xs fr-m-0">{{$t('This file is following a schema: ')}}</p>
                      <p class="fr-tag fr-tag--sm fr-icon-checkbox-circle-line fr-tag--icon-left">
                        {{schemaName ? schemaName : schemaUrl}}
                      </p>
                    </div>
                      <i18n-t keypath="Schemas allow to describe data models, discover how schemas improve your data quality and the available use cases on {address}" class="fr-text--xs fr-m-0" tag="p" scope="global">
                        <template #address>
                          <a :href="config.schema_documentation_url">schema.data.gouv.fr</a>
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
                      v-if="schemaName"
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
        </transition>
        <transition
          name="slide-fade"
          mode="in-out"
        >
          <div
            :id="resourceInformationTabId"
            class="fr-tabs__panel"
            :class="resourceInformationClass"
            role="tabpanel"
            :aria-labelledby="resourceInformationButtonId"
            :tabindex="resourceInformationTabIndex"
            v-show="resourceInformationSelected"
          >
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
              <div class="fr-col-auto fr-ml-auto" v-if="config.show_copy_resource_permalink">
                <button
                  :id="resourceCopyId"
                  ref="copyRef"
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
        </transition>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import Clipboard from "clipboard";
import { ref, computed, unref, onMounted, type ComputedRef } from "vue";
import SchemaLoader from "./SchemaLoader.vue";
import useOwnerName from "../../composables/organizations/useOwnerName";
import useResourceImage from "../../composables/resources/useResourceImage";
import CopyButton from "../CopyButton/CopyButton.vue";
import EditButton from "./EditButton.vue";
import { toggleAccordion } from "../../helpers/toggleAccordion";
import DescriptionDetails from "../DescriptionList/DescriptionDetails.vue";
import DescriptionList from "../DescriptionList/DescriptionList.vue";
import DescriptionTerm from "../DescriptionList/DescriptionTerm.vue";
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import useSchema from "../../composables/resources/useSchema";
import useComponentsForHook from "../../composables/useComponentsForHook";
import { config } from "../../config";
import { filesize, formatRelativeIfRecentDate, formatDate, markdown } from "../../helpers";
import type { Resource } from "../../types/resources";
import { templateRef, unrefElement } from "@vueuse/core";
import useTabs from "../../composables/useTabs";

type Props = {
  datasetId: string,
  expandedOnMount?: boolean,
  isCommunityResource?: boolean,
  resource: Resource,
  canEdit?: boolean
};

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  expandedOnMount: false,
  isCommunityResource: false,
  canEdit: false,
})

const owner = useOwnerName(props.resource);
const { url } = useResourceImage(props.resource);
const { getComponentsForHook } = useComponentsForHook();

const contentRef = templateRef<HTMLElement | null>("contentRef");
const copyRef = templateRef<HTMLButtonElement | null>("copyRef");
const tabsRef = templateRef<HTMLButtonElement | null>("tabsRef");
const tabListRef = templateRef<HTMLUListElement | null>("tabListRef");
const explore = getComponentsForHook("explore");
const structure = getComponentsForHook("data-structure");

const schemaName = computed(() => props.resource.schema ? props.resource.schema.name : "");
const schemaUrl = computed(() => props.resource.schema ? props.resource.schema.url : "");

const hasSchema = computed(() => schemaName.value || schemaUrl.value);
const hasExplore = computed(() => explore.length > 0 && config.explorable_resources && config.explorable_resources.includes(props.resource.id));
const resourcePreviewIndex = computed(() => {
  return 0;
});
const resourceStructureIndex = computed(() => {
  if (hasExplore.value && hasSchema.value) {
    return 1;
  }
  return 0;
});
const resourceInformationIndex = computed(() => {
  if (hasExplore.value && hasSchema.value) {
    return 2;
  }
  if (hasSchema.value) {
    return 1;
  }
  return 0;
});

const { asc, getIdFromIndex, isSelected, selectIndex } = useTabs(tabsRef, tabListRef, resourceInformationIndex.value);

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
  if(contentRef.value) {
    toggleAccordion(contentRef.value, expanded.value);
    const $elem = unrefElement(tabsRef);
    if ($elem) {
      if(expanded.value) {
        //const { height } = window.getComputedStyle($elem);
        //tabsHeight.value = height;
      } else {
        //tabsHeight.value = "auto";
      }
    }
  }
}

const registerEvent = (tab: ComputedRef<string> | string) => {
  const tabName = unref(tab);
  globalThis._paq?.push(['trackEvent', 'View resource tab', props.resource.id, tab]);
  if(tabName === resourcePreviewButtonId.value) {
    globalThis._paq?.push(['trackEvent', 'Show preview', props.resource.id]);
  } else if (tabName === resourceStructureButtonId.value) {
    globalThis._paq?.push(['trackEvent', 'Show data structure', props.resource.id]);
  }
}

const getTabPanelClass = (selected: boolean) => {
  return {'fr-tabs__panel--selected': selected };
};

const getTabPanelTabIndex = (selected: boolean) => {
  return selected ? 0 : -1;
};

const selectTab = (index: number) => {
  selectIndex(index);
  registerEvent(getIdFromIndex(index));
}

const availabilityChecked = computed(() => props.resource.extras && props.resource.extras['check:available']);
const lastUpdate = computed(() => props.resource.last_modified);
const unavailable = computed(() => availabilityChecked.value === false);
const { authorizeValidation, documentationUrl, loading, validationUrl, schemaReport} = useSchema(props.resource);
const hasSchemaErrors = computed(() => !!schemaReport.value.size);
const resourceExternalUrl = computed(() => {
  let hash = "#/resources/" + props.resource.id;
  return window.location.origin + window.location.pathname + hash;
});

const resourceContentId = computed(() => 'resource-' + props.resource.id);
const resourceHeaderId = computed(() => 'resource-' + props.resource.id + '-header');
const resourceTitleId = computed(() => 'resource-' + props.resource.id + '-title');
const resourceCopyId = computed(() => 'resource-' + props.resource.id + '-copy');

const resourcePreviewButtonId = computed(() => getIdFromIndex(resourcePreviewIndex.value));
const resourcePreviewTabId = computed(() => 'resource-' + props.resource.id + '-preview-tab');
const resourcePreviewSelected = computed(() => isSelected(resourcePreviewIndex.value));
const resourcePreviewTabIndex = computed(() => getTabPanelTabIndex(resourcePreviewSelected.value));
const resourcePreviewClass = computed(() => getTabPanelClass(resourcePreviewSelected.value));

const resourceStructureButtonId = computed(() => getIdFromIndex(resourceStructureIndex.value));
const resourceStructureTabId = computed(() => resourceStructureButtonId.value + '-structure-tab');
const resourceStructureSelected = computed(() => isSelected(resourceStructureIndex.value));
const resourceStructureTabIndex = computed(() => getTabPanelTabIndex(resourceStructureSelected.value));
const resourceStructureClass = computed(() => getTabPanelClass(resourceStructureSelected.value));

const resourceInformationButtonId = computed(() => getIdFromIndex(resourceInformationIndex.value));
const resourceInformationTabId = computed(() => resourceInformationButtonId.value + '-information-tab');
const resourceInformationSelected = computed(() => isSelected(resourceInformationIndex.value));
const resourceInformationTabIndex = computed(() => getTabPanelTabIndex(resourceInformationSelected.value));
const resourceInformationClass = computed(() => getTabPanelClass(resourceInformationSelected.value));

onMounted(() => {
  if(props.expandedOnMount) {
    expand();
  }
  if(copyRef.value && config.show_copy_resource_permalink) {
    new Clipboard(copyRef.value);
  }
});

const values = { true: '100%', false: '-100%' };
// @ts-ignore this will be fine
const translateValueFrom = computed(() => values[String(asc.value)]);
// @ts-ignore this will be fine
const translateValueTo = computed(() => values[String(!asc.value)]);
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from {
  transform: translateX(v-bind(translateValueFrom));
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(v-bind(translateValueTo));
  opacity: 0;
}
</style>
