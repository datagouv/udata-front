<template>
    <MultiSelect
        :placeholder="$t('Schema')"
        :searchPlaceholder="$t('Search a schema...')"
        listUrl="/spatial/granularities/"
        :values="values"
        :onChange="onChange"
    />
</template>

<script>
import { defineComponent, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import getCatalog from "../../api/schemas";
import { useToast } from "../../composables/useToast";
import MultiSelect from "./multi-select.vue";

export default defineComponent({
    components: {
        MultiSelect,
    },
    props: {
        onChange: {
            type: Function,
            required: true,
        },
        values: {
            type: [String, Array],
            required: true,
        }
    },
    setup(props) {
        const { t } = useI18n();
        const toast = useToast();
        /** @type {Ref<Array<import("../../api/schemas").Schema>>} */
        const schemas = ref([]);
        getCatalog()
        .then(catalog => schemas.value = catalog)
        .catch(() => {
            toast.error(
                t("An error occurred while fetching schemas")
            );
        });
        return {schemas};
    }
});
</script>