<template>
<div class="form-group">
  <label for="select-element">Que voulez-vous faire aujourd'hui ?</label>
  <select class="form-control" id="select-element" ref="select" data-placeholder="Chercher dans la liste">
      <option>Dormir</option>
      <option>Grimper aux arbres</option>
      <option>Tricoter</option>
      <option selected>Faire du vélo</option>
      <option>Rêver</option>
  </select>
</div>
</template>

<script>
import {ref, onMounted} from "vue";
import Select from "@conciergerie-dev/select-a11y";
export default {
  setup() {
    const select = ref(null);
    onMounted(() => {
      new Select(select.value);
    });
    return {
      select,
    }
  }
}
</script>

<style scoped>

</style>
