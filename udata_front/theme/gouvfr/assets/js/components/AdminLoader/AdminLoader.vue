<template>
  <Vicon name="ri-loader-5-line" animation="spin" :scale fill="var(--blue-cumulus-sun-368-moon-732)" />
</template>
<script setup lang="ts">
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiLoader5Line } from "oh-vue-icons/icons";

addIcons(RiLoader5Line);

withDefaults(defineProps<{
  scale?: number;
}>(), {
  scale: 4
});
</script>
