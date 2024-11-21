<template>
    <span class="fr-text--sm fr-mb-0">
    {{
        author.first_name +
        " " +
        author.last_name
    }}
    <span v-if="badge" class="fr-badge fr-ml-3v">{{ $t("Admin") }}</span>
    </span>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    author: {
      /** @type {import("vue").PropType<import("@datagouv/components/ts").User>} */
      type: Object,
      required: true,
    },
    badge: Boolean
  }
});
</script>
