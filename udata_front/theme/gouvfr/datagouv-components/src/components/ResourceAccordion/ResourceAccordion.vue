<template>
  <div class="border border-default-grey" :class="{ 'fr-pb-4v': open }">
    <header
      class="fr-p-4v flex items-center justify-between relative"
      :id="resourceHeaderId"
    >
      <div>
        <h4 class="fr-mb-1v flex items-center" :id="resourceTitleId">
          <button type="button" @click="toggle" class="fr-p-0 flex items-center" data-testid="expand-button" :aria-expanded="open">
            <ResourceIcon :resource class="fr-icon--xs fr-mr-1v" />
            <span :class="{
              'font-bold': open,
            }"><TextClamp :max-lines="1" :text="resource.title || t('Nameless file')"/></span>

            <span class="absolute inset-0 z-1"></span>
          </button>
          <CopyButton :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resourceExternalUrl" class="z-2" />
        </h4>
        <div class="text-grey-380 subheaders-infos">
          <SchemaBadge :resource class="dash-after" />
          <span class="fr-text--xs fr-mb-0 dash-after">{{ t('Updated {date}', {date: formatRelativeIfRecentDate(lastUpdate)}) }}</span>
          <span v-if="resource.format" class="fr-text--xs fr-mb-0 dash-after">
            <span class="hidden show-on-small">{{ t("Format") }}</span>
            {{ resource.format.trim().toLowerCase() }}
            <span v-if="resource.filesize">({{ filesize(resource.filesize) }})</span>
          </span>
          <span class="inline-flex items-center fr-text--xs fr-mb-0" :aria-label="t('{n} downloads', resource.metrics.views)">
            <span class="fr-icon-download-line fr-icon--xs fr-mr-1v"></span>
            <span>{{ summarize(resource.metrics.views) }} <span class="hidden show-on-small">{{ t("downloads") }}</span></span>
          </span>
        </div>
        <p class="fr-mb-0 fr-mt-1v fr-text--xs text-grey-380" v-if="communityResource">
          {{ t('From') }}
          <a class="fr-link fr-text--xs" v-if="communityResource.organization" :href="communityResource.organization.page" >
            <OrganizationNameWithCertificate :organization="communityResource.organization" />
          </a>
          <template v-else-if="owner">{{owner}}</template>
        </p>
      </div>
      <div class="flex items-center fr-ml-4v buttons">
        <p class="text-default-warning fr-m-0 fr-mr-2v" v-if="unavailable">
          {{ t('Unavailable') }}
        </p>
        <p class="fr-col-auto fr-ml-3v fr-m-0 z-2" v-if="resource.format === 'url'">
          <a
            :href="resource.latest"
            :title="t('File link - opens a new window')"
            rel="ugc nofollow noopener"
            target="_blank"
            class="fr-btn fr-btn--sm"
          >
            {{ $t('Visit') }}
          </a>
        </p>
        <p class="fr-col-auto fr-ml-3v fr-m-0" v-else>
          <a
            :href="resource.latest"
            rel="ugc nofollow noopener"
            :title="t('Download file')"
            download
            class="relative text-transform-uppercase fr-btn fr-btn--sm fr-btn--icon-left fr-icon-test-tube-line fr-icon-download-line fr-icon--sm matomo_download z-2"
          >
            {{ format }}
          </a>
        </p>
        <p class="fr-col-auto fr-ml-3v fr-m-0 z-2" v-if="canEdit">
          <EditButton
            :dataset-id="datasetId"
            :resource-id="resource.id"
            :is-community-resource="isCommunityResource"
          />
        </p>
        <div
          class="fr-icon--sm fr-ml-4v"
          :class="{'fr-icon-arrow-up-s-line': open, 'fr-icon-arrow-down-s-line': !open}"
        ></div>
      </div>
    </header>
    <section
      v-if="open"
      :aria-labelledby="resourceTitleId"
      :id="resourceContentId"
    >
      <TabGroup size="sm" @change="switchTab">
        <div class="fr-pl-4v fr-pr-4v fr-pb-4v" >
          <TabList style="max-width: 100%; overflow-y: auto;">
            <Tab v-for="tab in tabsOptions" :key="tab.key">{{ tab.label }}</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel v-for="tab in tabsOptions" :key="tab.key">
            <div v-if="tab.key === 'data'">
              <Preview :resource="resource" />
            </div>
            <div v-if="tab.key === 'description'"  class="fr-pl-4v fr-pr-4v">
              <div class="fr-mt-0 markdown fr-text--sm text-mention-grey" v-html="markdown(resource.description || '')"></div>
            </div>
            <div v-if="tab.key === 'data-structure'" class="fr-pl-4v fr-pr-4v">
              <DataStructure v-if="hasPreview" :resource="resource" />
            </div>
            <div v-if="tab.key === 'metadata'" class="fr-pl-4v fr-pr-4v">
              <Metadata :resource />
            </div>
            <div v-if="tab.key === 'downloads'" class="fr-pl-4v fr-pr-4v">
              <dl class="fr-pl-0">
                <dt class="font-bold fr-text--sm fr-mb-0" v-if="resource.format === 'url'">{{ $t('Original URL') }}</dt>
                <dt class="font-bold fr-text--sm fr-mb-0" v-else>{{ $t('Original format') }}</dt>
                <dd class="fr-text--sm fr-ml-0 fr-mt-0 fr-mb-2w text-mention-grey h-4w fr-grid-row fr-grid-row--middle">
                  <span v-if="resource.format === 'url'">
                    <a :href="resource.latest" class="fr-link no-icon-after" rel="ugc nofollow noopener" target="_blank">
                      <TextClamp :auto-resize="true" :max-lines="1" :text="resource.url">
                        <template #after>
                          <span class="fr-ml-1v fr-icon-external-link-line fr-icon--sm"></span>
                        </template>
                      </TextClamp>
                    </a>
                  </span>
                  <span v-else>
                    <span class="text-blue-400 fr-icon-download-line fr-icon--sm fr-mr-1v fr-mt-1v"></span>
                    <a :href="resource.latest" class="fr-link" rel="ugc nofollow noopener">
                      <span>{{ $t('Format {format}', { format: resource.format }) }}<span v-if="resource.filesize"> - {{ filesize(resource.filesize) }}</span></span>
                    </a>
                  </span>
                  <CopyButton :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.latest" class="relative" />
                </dd>
                <template v-if="resource.extras['analysis:parsing:parquet_url']">
                  <dt class="font-bold fr-text--sm fr-mb-0">{{ $t('Auto-generated formats from {platform}', { platform: config.title }) }}</dt>
                  <dd class="fr-text--sm fr-ml-0 fr-mt-0 fr-mb-2w text-mention-grey h-4w fr-grid-row fr-grid-row--middle">
                    <span>
                      <span class="text-blue-400 fr-icon-download-line fr-icon--sm fr-mr-1v fr-mt-1v"></span>
                      <a :href="resource.extras['analysis:parsing:parquet_url']" class="fr-link" rel="ugc nofollow noopener">
                        <span>{{ $t('Format {format}', { format: 'parquet' }) }}<span v-if="resource.extras['analysis:parsing:parquet_size']"> - {{ filesize(resource.extras['analysis:parsing:parquet_size']) }}</span></span>
                      </a>
                    </span>
                    <CopyButton :label="$t('Copy link')" :copied-label="$t('Link copied!')" :text="resource.extras['analysis:parsing:parquet_url']" class="relative" />
                  </dd>
                </template>
              </dl>
            </div>
            <div v-if="tab.key === 'swagger'" class="fr-pl-4v fr-pr-4v">
              <div>{{ t('Swagger automatically generated by data.gouv.fr. This swagger allows you to query data by API by filtering it by column value.') }}</div>
              <Swagger v-if="hasPreview" :url="`${config.tabular_api_url}/api/resources/${props.resource.id}/swagger/`" />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import { useI18n } from "vue-i18n";
import DataStructure from "./DataStructure/DataStructure.vue";
import Preview from "./Preview/Preview.vue";
import EditButton from "./EditButton.vue";
import OrganizationNameWithCertificate from "../Organization/OrganizationNameWithCertificate.vue";
import useOwnerName from "../../composables/organizations/useOwnerName";
import { config } from "../../config";
import { filesize, formatRelativeIfRecentDate, markdown, summarize } from "../../helpers";
import type { CommunityResource, Resource } from "../../types/resources";
import ResourceIcon from "./ResourceIcon.vue";
import SchemaBadge from "./SchemaBadge.vue";
import Metadata from "./Metadata.vue";
import TextClamp from 'vue3-text-clamp';
import TabGroup from "../Tabs/TabGroup.vue";
import TabList from "../Tabs/TabList.vue";
import Tab from "../Tabs/Tab.vue";
import TabPanels from "../Tabs/TabPanels.vue";
import TabPanel from "../Tabs/TabPanel.vue";
import { trackEvent } from "../../helpers/matomo";
import CopyButton from "../CopyButton/CopyButton.vue";
import { getResourceFormatIconSvg } from "../../helpers/resources";

const props = withDefaults(defineProps<{
  datasetId: string,
  expandedOnMount?: boolean,
  isCommunityResource?: boolean,
  resource: Resource | CommunityResource,
  canEdit?: boolean
}>(), {
  expandedOnMount: false,
  isCommunityResource: false,
  canEdit: false,
});

const Swagger = defineAsyncComponent(() => import("./Swagger.vue"));

const { t } = useI18n();

const hasPreview = computed(() => {
  return config.tabular_api_url
    && props.resource.extras['analysis:parsing:finished_at']
    && !props.resource.extras['analysis:parsing:error']
    && (config.tabular_allow_remote || props.resource.filetype === "file");
})

const format = computed(() => getResourceFormatIconSvg(props.resource) ? props.resource.format : t("File"))

const open = ref(props.expandedOnMount);
const toggle = () => {
  open.value = ! open.value;

  if (open.value) {
    trackEvent(['Open resource', props.resource.id]);
  } else {
    trackEvent(['Close resource', props.resource.id]);
  }
};

const tabsOptions = computed(() => {
  let options = [];

  if (hasPreview.value) {
    options.push({ key: "data", label: t("Data") })
  }

  if (props.resource.description) {
    options.push({ key: "description", label: t("Description") })
  }

  if (hasPreview.value) {
    options.push({ key: "data-structure", label: t("Data structure") })
  }

  options.push({ key: "metadata", label: t("Metadata") });
  options.push({ key: "downloads", label: t("Downloads") });

  if (hasPreview.value) {
    options.push({ key: "swagger", label: t("Swagger") })
  }

  return options;
});
const switchTab = (index: number) => {
  const option = tabsOptions.value[index];
  trackEvent(['View resource tab', props.resource.id, option.label])

  if (option.key === 'data') {
    trackEvent(['Show preview', props.resource.id])
  }
  if (option.key === 'data-structure') {
    trackEvent(['Show data structure', props.resource.id])
  }
}


const communityResource = computed<CommunityResource | null>(() => {
  if (! props.isCommunityResource) return null
  return props.resource as CommunityResource
})
const owner = useOwnerName(communityResource.value);

const lastUpdate = props.resource.last_modified;
const availabilityChecked = props.resource.extras && 'check:available' in props.resource.extras;
const unavailable = availabilityChecked && props.resource.extras['check:available'] === false;

const resourceExternalUrl = computed(() => `${window.location.origin}${window.location.pathname}#/${props.isCommunityResource ? 'community-resources' : 'resources'}/${props.resource.id}`);

const resourceContentId = 'resource-' + props.resource.id;
const resourceHeaderId = 'resource-' + props.resource.id + '-header';
const resourceTitleId = 'resource-' + props.resource.id + '-title';
</script>
<style scoped>
.fr-link--no-after::after {
  display: none !important;
}

header:hover {
  background-color: #f6f6f6;
}

/**
If we do not put z-index, the header is fully clickable except for the DSFR icons (bad because one of the icons is the chevron up/down). It may be due to the usage of ::before to add the icon in the markup or the `mask-image`. We need to put a `z-2` on all elements that we want to be clickable over the header.
*/
.z-1 {
  z-index: 1;
}
.z-2 {
  z-index: 2;
}

.z-3 {
  z-index: 3;
}

article {
  container-type: inline-size;
}

@container (max-width: 600px) {
  article header.flex {
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
  article header .buttons {
    margin-top: 1.25rem;
    margin-left: auto !important;
  }
/*
  If we want to put subheaders info in column on mobile…
  article header .subheaders-infos {
    display: flex;
    flex-direction: column
  }
  article header .subheaders-infos .hidden.show-on-small {
    display: inline !important;
  }
  article header .dash-after::after {
    content: ''
  } */

  /* article .fr-pl-4v fr-pr-4v {
    padding: 0.75rem !important;
  } */
}

</style>
