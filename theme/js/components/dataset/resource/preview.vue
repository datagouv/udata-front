<template>
  <div class="fr-table">
    <table>
      <caption class="fr-sr-only">{{$t('Preview of {name}', {name: resource.name})}}</caption>
      <thead>
        <tr>
          <th scope="col">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr>
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
