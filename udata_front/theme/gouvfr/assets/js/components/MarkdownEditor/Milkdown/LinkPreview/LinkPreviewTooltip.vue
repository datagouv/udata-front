<template>
  <EditorTooltip class="link-preview">
    <span class="fr-icon--link">
    </span>
    <a class="fr-link" :href="link">
      {{ link }}
    </a>
    <button class="fr-btn fr-btn--sm fr-icon-edit" @click="editLink">
      {{ t("Edit link") }}
    </button>
    <button class="fr-btn fr-btn--sm fr-icon-link-unlink" :title="t('Remove link')" @click="removeLink">
      {{ t("Remove link") }}
    </button>
  </EditorTooltip>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCtx } from "../useCtx";
import EditorTooltip from "../EditorTooltip.vue";
import { linkTooltipState } from "../LinkEdit/linkEditTooltip";

const { t } = useI18n();
const { ctx } = useCtx();

const link = ref("");

onMounted(() => {
  if(!ctx.value) return;
  const { mark } = ctx.value.get(linkTooltipState.key);
  link.value = mark?.attrs.href ?? "";
});

function editLink() {

}

function removeLink() {

}
</script>
