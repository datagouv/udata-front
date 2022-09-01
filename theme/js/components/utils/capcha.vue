<template>
  <div>capcha</div>
</template>
<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchHtml } from '../../api/captcha';

export default defineComponent({
  setup() {
    const { locale } = useI18n();
    const displayHtml = () => {
      console.log(locale)
      fetchHtml('captchaFR').then(html => console.log(html))
    }
    displayHtml()
    return {
      locale
    }
  },
});
</script>