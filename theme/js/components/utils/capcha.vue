<template>
  <div id="BDC_CaptchaComponent" v-html="captchaHtml"></div>
  <input type="hidden" name="captcha_id" v-model="id"/>
</template>
<script>
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchHtml, fetchScript } from '../../api/captcha';

/**
 * @typedef capchaInstance
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

    const displayHtml = () => {
      fetchHtml(props.captchaStyleName)
        .then(html => captchaHtml.value = html)
        .then(() =>  {
          const input = document.querySelector('#BDC_VCID_' + props.captchaStyleName)
          if(input instanceof HTMLInputElement) {
            fetchScript(props.captchaStyleName, input.value).then(() => id.value = captchaId.value)
          }
        })
    }

    /** @type {import("vue").ComputedRef<undefined | capchaInstance>} */
    const instance = computed(() => {
      return window.botdetect?.getInstanceByStyleName(props.captchaStyleName)
    })

    /** @type {import("vue").ComputedRef<undefined | string>} */
    const captchaId = computed(() => {
      return instance.value?.captchaId
    })

    displayHtml()

    return {
      captchaHtml,
      id
    }
  },
});
</script>