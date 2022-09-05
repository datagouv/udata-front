<template>
  <div id="BDC_CaptchaComponent" v-html="captchaHtml"></div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchHtml, fetchScript } from '../../api/captcha';

export default defineComponent({
  props: {
    captchaStyleName:  {
      type: /** @type import('vue').PropType<import('../../api/captcha').CaptchaStyle>} **/ (String),
      required: true,
    }
  },
  setup(props) {
    const { locale } = useI18n();
    const captchaHtml = ref(null);
    const displayHtml = () => {
      fetchHtml(props.captchaStyleName)
        .then(html => captchaHtml.value = html)
        .then(() =>  {
          const input = document.querySelector('#BDC_VCID_' + props.captchaStyleName)
          if(input instanceof HTMLInputElement) {
            fetchScript(props.captchaStyleName, input.value)
          }
        })
    }
    const getInstance = () => {
      return window.botdetect.getInstanceByStyleName(props.captchaStyleName)
    }
    displayHtml()
    return {
      captchaHtml,
      locale
    }
  },
});
</script>