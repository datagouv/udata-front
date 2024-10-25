<template>
  <div id="swagger-ui"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type Resource } from '../../types/resources';
import { config } from "../../config";
import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-bundle.js';
import 'swagger-ui-dist/swagger-ui.css';
import 'swagger-themes/themes/newspaper.css';

const { t } = useI18n();

const props = defineProps<{
    url: string;
}>();

onMounted(async () => {
  SwaggerUIBundle({
    dom_id: '#swagger-ui',
    url: props.url,
  });
});

</script>


<style scoped>
#swagger-ui {
  font-family: 'Marianne', sans-serif;
}

.swagger-ui .info,
.swagger-ui .topbar {
  font-family: 'Marianne', sans-serif;
}
</style>