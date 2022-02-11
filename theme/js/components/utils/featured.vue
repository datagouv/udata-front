<template>
<div class="fr-toggle fr-toggle--label-left">
    <input @click="toggleFeatured" type="checkbox" class="fr-toggle__input" aria-describedby="toggle-698-hint-text" id="toggle-698" :checked=featured>
    <label class="fr-toggle__label" for="toggle-698" :data-fr-checked-label="$t('Unfeature this content')" :data-fr-unchecked-label="$t('Feature this content')"></label>
</div>
</template>

<script>

export default {
    name: "featured-button",
    props: {
        subjectId: String,
        subjectType: String,
        featured: Boolean,
        compact: Boolean
    },
    mounted() {
        this._featured = this.featured;
    },
    methods: {
        toggleFeatured() {
            const method = this._featured ? 'delete' : 'post';
            const url = `${this.subjectType.toLowerCase()}s/${this.subjectId}/featured/`;
            this.$api[method](url)
                .then(response => {
                    this._featured = !this._featured;
                })
                .catch(log.error.bind(log));

        }
    },
}
</script>
