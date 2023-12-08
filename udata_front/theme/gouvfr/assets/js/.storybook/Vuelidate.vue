<template>
  <div class="fr-table">
    <table>
        <caption>Vuelidate rules</caption>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Rules</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="rule in rules">
                <td>{{ rule.name }}</td>
                <td>{{ rule.rules }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';

function getRuleWithParam(rules, index) {
  const rule = rules[index];
  if(rule.$params.min) {
    return `${index}(${rule.$params.min})`;
  }
  return index;
}

export default defineComponent({
  props: {
    rules: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    /** @type {import("vue").Ref<Array<{name: string, rules: string}>>} */
    const rules = ref([]);
    for (let rule in props.rules) {
      let rulestoAdd = [];
      let rulesForASingleProp = props.rules[rule];
      for (let index in rulesForASingleProp) {
        if(!rulesForASingleProp[index].$params || rulesForASingleProp[index].$params.prop !== false) {
          const recordedRule = getRuleWithParam(rulesForASingleProp, index);
          rulestoAdd.push(recordedRule);
        }
      }
      if(rulestoAdd.length) {
        rules.value.push({
          name: rule,
          rules: rulestoAdd.join(", "),
        });
      }
    }
    return {
      rules,
    }
  },
});
</script>
