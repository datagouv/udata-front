<template>
  <div class="fr-table fr-table--no-background fr-p-0 fr-pt-0-5v fr-m-0">
    <table class="fr-mb-3w">
      <caption class="fr-sr-only">{{ $t('Preview of {name}', { name: resource.name }) }}</caption>
      <thead>
        <tr>
          <th scope="col" v-for="col in columns">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="col in columns">{{row[col]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col">{{ $t('{count} columns', columnCount) }} — {{ $t('{count} rows', rowCount) }}</div>
    <div class="fr-col-auto">
      <a :href="resource.preview_url" class="fr-btn fr-btn--icon-left fr-icon-test-tube-line">{{ $t('Explore data') }}</a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { csvapi } from "../../../plugins/api";

export default defineComponent({
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const apiUrl = new URL(csvapi.defaults.baseURL ?? '');
    apiUrl.pathname = '/apify';
    apiUrl.searchParams.set('url', encodeURI(props.resource.latest));
    apiUrl.searchParams.set('analysis', 'yes');
    const columns = [
      "dep",
      "date",
      "reg",
      "lib_dep",
      "lib_reg",
      "tx_pos",
      "tx_incid",
      "TO",
      "R",
      "hosp",
      "rea",
      "rad",
      "dchosp",
      "reg_rea",
      "incid_hosp",
      "incid_rea",
      "incid_rad",
      "incid_dchosp",
      "reg_incid_rea",
      "pos",
      "pos_7j",
      "cv_dose1"
    ];
    const generalInformations = {
      "dataset_id": null,
      "date_last_check": "2022-10-25",
      "encoding": "UTF-8",
      "filetype": "csv",
      "header_row_idx": 0,
      "nb_cells_missing": 202004,
      "nb_columns": 22,
      "nb_vars_all_missing": 0,
      "nb_vars_with_missing": 11,
      "resource_id": null,
      "separator": ",",
      "total_lines": 96152
    };
    const rows = [
      {
        "R": null,
        "TO": 0.0626118067978533,
        "cv_dose1": null,
        "date": "2020-03-18",
        "dchosp": 0.0,
        "dep": "01",
        "hosp": 2.0,
        "incid_dchosp": null,
        "incid_hosp": null,
        "incid_rad": null,
        "incid_rea": null,
        "lib_dep": "Ain",
        "lib_reg": "Auvergne et Rh\u00f4ne-Alpes",
        "pos": null,
        "pos_7j": null,
        "rad": 1.0,
        "rea": 0.0,
        "reg": 84.0,
        "reg_incid_rea": null,
        "reg_rea": 35.0,
        "tx_incid": null,
        "tx_pos": null
      },
      {
        "R": null,
        "TO": 0.132379248658318,
        "cv_dose1": null,
        "date": "2020-03-19",
        "dchosp": 0.0,
        "dep": "01",
        "hosp": 2.0,
        "incid_dchosp": 0.0,
        "incid_hosp": 1.0,
        "incid_rad": 0.0,
        "incid_rea": 0.0,
        "lib_dep": "Ain",
        "lib_reg": "Auvergne et Rh\u00f4ne-Alpes",
        "pos": null,
        "pos_7j": null,
        "rad": 1.0,
        "rea": 0.0,
        "reg": 84.0,
        "reg_incid_rea": 44.0,
        "reg_rea": 79.0,
        "tx_incid": null,
        "tx_pos": null
      },
      {
        "R": null,
        "TO": 0.155635062611807,
        "cv_dose1": null,
        "date": "2020-03-20",
        "dchosp": 0.0,
        "dep": "01",
        "hosp": 2.0,
        "incid_dchosp": 0.0,
        "incid_hosp": 0.0,
        "incid_rad": 1.0,
        "incid_rea": 0.0,
        "lib_dep": "Ain",
        "lib_reg": "Auvergne et Rh\u00f4ne-Alpes",
        "pos": null,
        "pos_7j": null,
        "rad": 1.0,
        "rea": 0.0,
        "reg": 84.0,
        "reg_incid_rea": 16.0,
        "reg_rea": 87.0,
        "tx_incid": null,
        "tx_pos": null
      },
      {
        "R": null,
        "TO": 0.173524150268336,
        "cv_dose1": null,
        "date": "2020-03-21",
        "dchosp": 0.0,
        "dep": "01",
        "hosp": 4.0,
        "incid_dchosp": 0.0,
        "incid_hosp": 3.0,
        "incid_rad": 0.0,
        "incid_rea": 0.0,
        "lib_dep": "Ain",
        "lib_reg": "Auvergne et Rh\u00f4ne-Alpes",
        "pos": null,
        "pos_7j": null,
        "rad": 1.0,
        "rea": 0.0,
        "reg": 84.0,
        "reg_incid_rea": 15.0,
        "reg_rea": 88.0,
        "tx_incid": null,
        "tx_pos": null
      },
      {
        "R": null,
        "TO": 0.212880143112701,
        "cv_dose1": null,
        "date": "2020-03-22",
        "dchosp": 0.0,
        "dep": "01",
        "hosp": 8.0,
        "incid_dchosp": 0.0,
        "incid_hosp": 3.0,
        "incid_rad": 1.0,
        "incid_rea": 1.0,
        "lib_dep": "Ain",
        "lib_reg": "Auvergne et Rh\u00f4ne-Alpes",
        "pos": null,
        "pos_7j": null,
        "rad": 2.0,
        "rea": 1.0,
        "reg": 84.0,
        "reg_incid_rea": 25.0,
        "reg_rea": 106.0,
        "tx_incid": null,
        "tx_pos": null
      },
    ];
    const rowCount = 96152;
    const columnCount = columns.length;
    return {
      generalInformations,
      columns,
      rows,
      rowCount,
      columnCount,
    }
  }
});
</script>
