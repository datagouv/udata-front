<template>
    <div class="fr-icon-svg flex items-center">
        <img :src="url" alt="" />
    </div>
</template>
<script setup lang="ts">
import type { Resource } from '../../types/resources';
import file from '../../../../templates/svg/resources/file.svg';

import { computed } from 'vue';
import { getResourceFormatIconSvg } from '../../helpers/resources';

const props = defineProps<{
    resource: Resource
}>();

const url = computed(() => getResourceFormatIconSvg(props.resource) || file)
</script>