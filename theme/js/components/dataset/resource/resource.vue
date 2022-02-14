<template>
  <article class="border-bottom">
    <header
      class="fr-py-2w fr-grid-row fr-grid-row--gutters fr-grid-row--middle no-wrap wrap-md justify-between"
      :id="'resource-' + resource.id + '-header'"
    >
      <div class="fr-col-auto">
        <h4
          class="fr-mb-1v"
          :id="'resource-' + resource.id + '-title'"
        >
          {{ resource.title || $t('Nameless resource') }}
        </h4>
        <div class="fr-text--sm fr-mb-0 text-grey-380">
          <template v-if="resource.owner">
            {{ $t('From X', {owner: owner}) }} —
          </template>
          {{$t('Updated on X', {date: $filters.formatDate(lastUpdate)})}} —
          {{ resource.format?.trim()?.toLowerCase() }}
          <template v-if="resource.filesize">({{ $filters.filesize(resource.filesize) }})</template> —
          {{ $t('X downloads', resource.metrics.views || 0) }}
        </div>
      </div>
      <div class="fr-col-auto text-default-error" v-if="unavailable">{{$t('Unavailable')}}</div>
      <div class="fr-col-auto" v-else>
        <ul class="fr-grid-row fr-grid-row--middle no-wrap wrap-md">
          <li class="fr-col-auto fr-mr-5w" v-if="showSchemaButton">
            <schema-button :resource="resource"/>
          </li>
          <li class="fr-col-auto fr-mr-3v" v-if="canEdit">
            <a
              :href="adminUrl"
              :title="$t('Edit resource')"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-svg"
              v-html="edit"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-mr-3v" v-if="resource.preview_url">
            <button
              :title="$t('Preview')"
              @click.prevent="$showModal('preview', {url: resource.preview_url}, true)"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-svg"
              v-html="preview"
            >
            </button>
          </li>
          <li class="fr-col-auto fr-mr-3v">
            <button
              :id="resource.id + '-copy'"
              :title="$t('Copy permalink to clipboard')"
              :data-clipboard-text="resource.latest"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-links-fill"
            >
            </button>
          </li>
          <li class="fr-col-auto" v-if="resource.format === 'url'">
            <a
              :href="resource.latest"
              :title="$t('Resource link')"
              rel="nofollow"
              target="_blank"
              class="fr-btn fr-btn--sm fr-fi-external-link-line"
            >
            </a>
          </li>
          <li class="fr-col-auto" v-else>
            <a
              :href="resource.latest"
              :title="$t('Download resource')"
              download
              class="fr-btn fr-btn--sm fr-fi-download-line"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-ml-7v">
            <button
              @click.prevent="expand"
              role="button"
              :aria-expanded="expanded"
              :title="$t('See more details')"
              :aria-controls="'resource-' + resource.id"
              class="accordion-button fr-fi-arrow-right-s-line fr-p-1w"
            >
            </button>
          </li>
        </ul>
      </div>
    </header>
    <section
      class="accordion-content fr-pt-5v fr-pb-4w"
      :class="{active: expanded}"
      :style="{height: expanded ? 'auto' : 0}"
      :aria-labelledby="'resource-' + resource.id + '-title'"
      :hidden="!expanded"
      :id="'resource-' + resource.id"
    >
      <div class=" fr-mt-0 markdown" v-if="resource.description" v-html="$filters.markdown(resource.description)">
      </div>
      <dl>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('URL') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10 text-overflow-ellipsis">
            <a :href="resource.url">{{resource.url}}</a>
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('Permalink') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10 text-overflow-ellipsis">
            <a :href="resource.latest">{{resource.latest}}</a>
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('Type') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{ typeLabel }}
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('MIME Type') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{resource.mime}}
          </dd>
        </div>
        <div v-if="resource.checksum" class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{resource.checksum.type}}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{resource.checksum.value}}
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('Created on') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{$filters.formatDate(resource.created_at)}}
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters fr-mb-2w">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('Modified on') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{$filters.formatDate(resource.last_modified)}}
          </dd>
        </div>
        <div class="fr-grid-row fr-grid--gutters">
          <dt class="fr-col-4 fr-col-md-3 fr-col-lg-2">{{ $t('Published on') }}</dt>
          <dd class="fr-ml-0 fr-col-8 fr-col-md-9 fr-col-lg-10">
            {{$filters.formatDate(resource.published)}}
          </dd>
        </div>
      </dl>
    </section>
  </article>
</template>

<script>
import config from "../../../config";
import SchemaButton from "./schema-button";
import useOwner from "../../../composables/useOwned";
import edit from "svg/edit.svg";
import preview from "svg/preview.svg";

export default {
  components: {SchemaButton},
  props: {
    datasetId: {
      type: String,
      required: true,
    },
    /** @type ResourceModel */
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
    const owner = useOwner(props.resource);
    return {
      edit,
      owner,
      preview,
    }
  },
  computed: {
    availabilityChecked() {
      return this.resource.extras && this.resource.extras['check:status'];
    },
    available() {
      return this.availabilityChecked && this.availabilityChecked >= 200 && this.availabilityChecked < 400;
    },
    lastUpdate() {
      return this.resource.published > this.resource.last_modified ? this.resource.published : this.resource.last_modified;
    },
    unavailable() {
      return this.availabilityChecked && this.availabilityChecked >= 400;
    },
    showSchemaButton() {
      return this.resource.schema && this.resource.schema.name
    },
  },
  data() {
    return {
      adminUrl: `${config.admin_root}dataset/${this.datasetId}/resource/${this.resource.id}`,
      expanded: false,
    }
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    }
  }
}
</script>
