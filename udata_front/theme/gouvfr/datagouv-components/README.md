# data.gouv.fr Components

## Architectures

The package contains ready-made components to use on your data.gouv.fr front-end.

This package works with `@gouvfr/dsfr` and `@gouvminint/vue-dsfr` packages.

You should add their styles and js before using these components.

The package requires a call to `setupI18n` to create its vue-i18n instance.
You must add the i18n instance to your Vue instance.
You can also use an existing i18n instance instead with `setupI18nWithExistingInstance`.

You should add the package styles after the DSFR ones or you may encounter unexpected results.

```ts
import '@gouvfr/dsfr/dist/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/utility.min.css';
import '@gouvfr/dsfr/dist/dsfr.module.min.js'; // or vue-dsfr
import '@etalab/data.gouv.fr-components/dist/style.css';
import { setupI18n } from '@etalab/data.gouv.fr-components';

import { createApp } from 'vue';
import App from './App.vue';

const i18n = setupI18n();

createApp(App)
.use(i18n)
.mount('#app');

window.dsfr.start(); // nothing here if you're using vue-dsfr
```

## env variables

You can customize how this package work with env variables during build and runtime (with `setupComponents` function).
