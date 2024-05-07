<template>
    <meter class="quality-score" :class="props.class" min="0" low="0" :high="high" :max="quality_max_score" :optimum="quality_max_score" :value="score">
        {{props.score}}/{{quality_max_score}}
    </meter>
</template>

<script setup lang="ts">
type Props = {
    score: number,
    class?: string
};
const props = withDefaults(defineProps<Props>(), {
  class: "",
});
const quality_max_score = 1;
const high = quality_max_score*2/3;
</script>
