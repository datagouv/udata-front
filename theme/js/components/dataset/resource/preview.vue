<template>
  <div class="fr-table fr-table--no-background fr-p-0 fr-pt-0-5v fr-m-0">
    <table class="fr-mb-3w">
      <caption class="fr-sr-only">{{$t('Preview of {name}', {name: resource.name})}}</caption>
      <thead>
        <tr>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>Data</td>
          <td>Data</td>
        </tr>
      </tbody>
    </table>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col">{{$t('{count} columns')}} — {{$t('{count} rows')}}</div>
      <div class="fr-col-auto">
        <button class="fr-btn fr-btn--icon-left fr-icon-test-tube-line">{{$t('Explore data')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  setup(props) {

  }
});
</script>
