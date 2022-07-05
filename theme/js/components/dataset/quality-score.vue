<template>
    <meter class="quality-score" min="0" low="0" :high="high" :max="quality_max_score" :optimum="quality_max_score" :value="score">
        {{score}}/{{quality_max_score}}
    </meter>
</template>

<script>
import { defineComponent } from "vue";
import { quality_max_score } from "../../config"

export default defineComponent({
    props: {
        score: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        return {
            high: Math.ceil(quality_max_score*2/3),
            quality_max_score,
            score: props.score,
        };
    }
});
</script>