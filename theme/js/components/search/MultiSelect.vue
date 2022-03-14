<template>
<div class="form-group">
  <label for="select-element">Que voulez-vous faire aujourd'hui ?</label>
  <select class="form-control" id="select-element" data-select-a11y data-placeholder="Chercher dans la liste">
      <option>Dormir</option>
      <option>Grimper aux arbres</option>
      <option>Tricoter</option>
      <option selected>Faire du vélo</option>
      <option>Rêver</option>
  </select>
</div>
</template>

<script>
import * as classes from '@pidila/scampi/modules/select-a11y/index.scss';
export default {
  name: "MultiSelect"
}
</script>

<style scoped>

</style>
