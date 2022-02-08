<template>
  <article class="resource-card">
    <header
      class="fr-my-2w fr-grid-row fr-grid-row--gutters fr-grid-row--middle no-wrap wrap-md justify-between"
      :id="'resource-' + resource.id + '-header'"
    >
      <div class="fr-col-auto">
        <h4 class="fr-mb-1v">{{ resource.title || $t('Nameless resource') }}</h4>
        <div class="fr-text--sm fr-mb-0 text-grey-380">
          {{$t('Updated on X', {date: $filters.formatDate(lastUpdate)})}} —
          <template v-if="resource.owner">
            {{ $t('From X', {owner: owner}) }} —
          </template>
          {{ resource.format?.trim()?.toLowerCase() }}
          <template v-if="resource.filesize">({{ $filters.filesize(resource.filesize) }})</template> —
          {{ resource.metrics.views || 0 }} {{ $t('downloads') }}
        </div>
        <div class="text-green-400" v-if="available">{{$t('Available')}}</div>
        <div class="text-default-error" v-else-if="unavailable">{{$t('Unavailable')}}</div>
      </div>
      <div class="fr-col-auto">
        <ul class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle no-wrap wrap-md">
          <li class="fr-col-auto fr-mr-3w" v-if="showSchemaButton">
            <schema-button :resource="resource"/>
          </li>
          <li class="fr-col-auto" v-if="canEdit">
            <a
              :href="adminUrl"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-edit-line"
            >
              {{$t('Edit resource')}}
            </a>
          </li>

          <li class="fr-col-auto" v-if="resource.preview_url">
            <button
              :title="$t('Preview')"
              @click.prevent="$showModal('preview', {url: resource.preview_url}, true)"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-eye-line"
            >
            </button>
          </li>
          <li class="fr-col-auto">
            <button
              :id="resource.id + '-copy'"
              :title="$t('Copy permalink to clipboard')"
              :data-clipboard-text="resource.latest"
              class="fr-btn fr-btn--secondary fr-btn--sm fr-fi-links-fill"
            >
            </button>
          </li>
          <li class="fr-col-auto" v-if="resource.format !== 'url'">
            <a
              :href="resource.latest"
              :aria-label="$t('Resource link')"
              rel="nofollow"
              target="_blank"
              class="fr-btn fr-btn--sm fr-fi-external-link-line"
            >
            </a>
          </li>
          <li class="fr-col-auto" v-else>
            <a
              :href="resource.latest"
              :aria-label="$t('Download resource')"
              download
              class="fr-btn fr-btn--sm fr-fi-download-line"
            >
            </a>
          </li>
          <li class="fr-col-auto fr-ml-3v">
            <button
              @click.prevent="expand"
              role="button"
              :aria-expanded="expanded"
              :aria-label="$t('See more details')"
              :aria-controls="'resource-' + resource.id"
              class="accordion-button fr-fi-arrow-right-s-line fr-p-1w"
            >
            </button>
          </li>
        </ul>
      </div>
    </header>
    <section
      class="accordion-content"
      :class="{active: expanded}"
      :style="{height: expanded ? 'auto' : 0}"
      :aria-labelledby="'resource-' + resource.id + '-header'"
      :hidden="!expanded"
      :id="'resource-' + resource.id"
    >
      <div class="resource-description markdown" v-if="resource.description" v-html="$filters.markdown(resource.description)">
      </div>
      <dl class="description-list">
        <div>
          <dt>{{ $t('URL') }}</dt>
          <dd><a :href="resource.url">{{resource.url}}</a></dd>
        </div>
        <div>
          <dt>{{ $t('Permalink') }}</dt>
          <dd><a :href="resource.latest">{{resource.latest}}</a></dd>
        </div>
        <div>
          <dt>{{ $t('Type') }}</dt>
          <dd>{{ typeLabel }}</dd>
        </div>
        <div>
          <dt>{{ $t('MIME Type') }}</dt>
          <dd>{{resource.mime}}</dd>
        </div>
        <div v-if="resource.checksum">
          <dt>{{resource.checksum.type}}</dt>
          <dd>{{resource.checksum.value}}</dd>
        </div>
        <div>
          <dt>{{ $t('Created on') }}</dt>
          <dd>{{$filters.formatDate(resource.created_at)}}</dd>
        </div>
        <div>
          <dt>{{ $t('Modified on') }}</dt>
          <dd>{{$filters.formatDate(resource.last_modified)}}</dd>
        </div>
        <div>
          <dt>{{ $t('Published on') }}</dt>
          <dd>{{$filters.formatDate(resource.published)}}</dd>
        </div>
      </dl>
    </section>
  </article>
</template>

<script>
import config from "../../../config";
import SchemaButton from "./schema-button";
import useOwner from "../../../composables/useOwned";

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
      owner,
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
