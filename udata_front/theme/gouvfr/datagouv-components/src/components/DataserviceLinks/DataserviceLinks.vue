<template>
    <div>
        <div 
            class="border border-blue-400 fr-p-2w fr-dataservice__box"
            v-if="(!showSwaggerBox && dataservice.endpoint_description_url) || dataservice.base_api_url"
        >
            <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
                <div class="fr-col-12 fr-col-sm">
                    <h2 class="fr-h6 fr-mb-0 text-blue-400">{{ t("API documentation") }}</h2>
                </div>
                <div class="fr-col-auto flex">
                <a
                    class="fr-btn"
                    :href="dataservice.endpoint_description_url"
                    target="_blank"
                    rel="ugc nofollow noopener"
                    v-if="!showSwaggerBox && dataservice.endpoint_description_url"
                >
                    {{ t('Technical Documentation') }}
                </a>
                <a
                    class="fr-btn"
                    :class="showSwaggerBox ? '' : 'fr-ml-3v fr-btn--secondary'"
                    :href="dataservice.base_api_url"
                    target="_blank"
                    rel="ugc nofollow noopener"
                    v-if="dataservice.base_api_url"
                >
                    {{ t('Business documentation') }}
                </a>
                </div>
            </div>
        </div>
        <br />
        <div class="border border-blue-400 fr-p-2w fr-dataservice__box fr-dataservice__swagger" v-if="showSwaggerBox">
            <header
                class="fr-p-2v flex items-center justify-between relative"
                @click="toggle"
            >
            <div>
                <h4 class="fr-h6 fr-mb-0 text-blue-400">
                    {{ t('Swagger') }}
                </h4>
            </div>
            <div class="flex items-center fr-ml-4v buttons">
                <div
                    class="fr-icon--sm fr-ml-4v"
                    :class="{'fr-icon-arrow-up-s-line': openSwagger, 'fr-icon-arrow-down-s-line': !openSwagger}"
                ></div>
            </div>
            </header>
            <div v-if="openSwagger">
                <Swagger :url="dataservice.endpoint_description_url" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { type Dataservice } from '../../types/dataservices';
import Swagger from '../ResourceAccordion/Swagger.vue'

const { t } = useI18n();
const openSwagger = ref(false);
const showSwaggerBox = ref(false);

const props = defineProps<{
    dataservice: Dataservice;
}>();

const toggle = () => {
  openSwagger.value = ! openSwagger.value;
}; 

function isOpenApiFile(endpoint: string) {
    return endpoint.endsWith('.json') || endpoint.endsWith('.yaml') || endpoint.endsWith('.yml');
}

onMounted(async () => {
    if (props.dataservice.endpoint_description_url) {
        showSwaggerBox.value = isOpenApiFile(props.dataservice.endpoint_description_url)
    }
});

</script>

<style scoped>

.fr-dataservice__box {
  background-color: var(--background-alt-grey);
}

.fr-dataservice__swagger:hover{
    cursor: pointer;
}

</style>
