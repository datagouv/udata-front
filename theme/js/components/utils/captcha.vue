<template>
  <div id="BDC_CaptchaComponent" v-html="captchaHtml"></div>
  <input type="hidden" name="captcha_id" v-model="id" ref="input"/>
</template>
<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { fetchHtml, fetchScript } from '../../api/captcha';

/**
 * @typedef captchaInstance
 * @property {string} captchaId
 * @property {string} captchaStyleName
 */

export default defineComponent({
  props: {
    captchaStyleName:  {
      type: /** @type {import('vue').PropType<import('../../api/captcha').CaptchaStyle>} **/ (String),
      required: true,
    }
  },
  setup(props) {
    const captchaHtml = ref(null);

    /** @type {import("vue").Ref<undefined | string>} */
    const id = ref();

    /** @type {import("vue").Ref<undefined | HTMLInputElement>} */
    const input = ref();

    const displayHtml = () => {
      fetchHtml(props.captchaStyleName)
        .then(html => captchaHtml.value = html)
        .then(() =>  {
          const input = document.querySelector('#BDC_VCID_' + props.captchaStyleName)
          if(input instanceof HTMLInputElement) {
            fetchScript(props.captchaStyleName, input.value).then(() => id.value = captchaId.value)
          }
        })
    };

    /** @type {import("vue").ComputedRef<undefined | captchaInstance>} */
    const instance = computed(() => {
      return window.botdetect?.getInstanceByStyleName(props.captchaStyleName)
    });

    /** @type {import("vue").ComputedRef<undefined | string>} */
    const captchaId = computed(() => {
      return instance.value?.captchaId
    });

    displayHtml();

    onMounted(() => {
      if(input.value instanceof HTMLInputElement) {
        let button = input.value.form?.querySelector('[type="submit"]');
        if(button instanceof HTMLButtonElement) {
          button.disabled = false;
        }
      }
    });

    return {
      captchaHtml,
      id,
      input,
    }
  },
});
</script>
