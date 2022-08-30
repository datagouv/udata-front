<template>
    <meter class="quality-score" min="0" low="0" :high="high" :max="quality_max_score" :optimum="quality_max_score" :value="score">
        {{score}}/{{quality_max_score}}
    </meter>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        score: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        const quality_max_score = 1;
        return {
            high: quality_max_score*2/3,
            quality_max_score,
            score: props.score,
        };
    }
});
</script>
