<template>
<div class="fr-toggle fr-toggle--label-left">
    <input ref="toggleInput" @click="toggleFeatured" type="checkbox" class="fr-toggle__input" id="featured-toggle" :checked="_featured">
    <label class="fr-toggle__label" for="featured-toggle" :data-fr-checked-label="$t('Unfeature this content')" :data-fr-unchecked-label="$t('Feature this content')"></label>
</div>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
    name: "featured-button",
    props: {
        subjectId: String,
        subjectType: String,
        featured: Boolean,
    },
    data() {
        return {
            registration: null,
            _featured: this.featured,
        }
    },
    mounted() {
        this.$refs.toggleInput.toggleAttribute('checked', this._featured);
    },
    methods: {
        toggleFeatured() {
            const method = this._featured ? 'delete' : 'post';
            const url = `${this.subjectType.toLowerCase()}s/${this.subjectId}/featured/`;
            this.$api[method](url)
                .then(response => {
                    this._featured = !this._featured;
                })
                .catch(() => this.$toast.error(this.$t('An error occurred while featuring this subject.')));

        }
    },
});
</script>
