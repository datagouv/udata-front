<template>
<div class="fr-toggle fr-toggle--label-left">
    <input ref="toggleInput" @click="toggleFeatured" type="checkbox" class="fr-toggle__input" id="featured-toggle" :checked="isFeatured">
    <label class="fr-toggle__label" for="featured-toggle" :data-fr-checked-label="t('Unfeature this content')" :data-fr-unchecked-label="t('Feature this content')"></label>
</div>
</template>

<script>
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "../../composables/useToast";
import { api } from "../../plugins/api";
export default defineComponent({
    name: "featured-button",
    props: {
        subjectId: {
            type: String,
            required: true,
        },
        subjectType: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const {t} = useI18n();
        const toast = useToast();
        const isFeatured = ref(props.featured);
        /** @type {Ref<HTMLElement | null>} */
        const toggleInput = ref(null);

        const toggleFeatured = () => {
            const method = isFeatured.value ? 'delete' : 'post';
            const url = `${props.subjectType.toLowerCase()}s/${props.subjectId}/featured/`;
            api[method](url)
            .then(response => {
                isFeatured.value = !isFeatured.value;
            })
            .catch(() => toast.error(t('An error occurred while featuring this subject.')));
        }

        onMounted(() => toggleInput.value?.toggleAttribute('checked', isFeatured.value));

        return {
            isFeatured,
            t,
            toggleFeatured,
            toggleInput,
        }
    },
});
</script>
