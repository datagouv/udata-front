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
import '@datagouv/components/dist/style.css';
import { setupI18n } from '@datagouv/components/ts';

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

## Publish a new version

`datagouv-components` is published as `@datagouv/components` on [NPM](https://www.npmjs.com/package/@datagouv/components).

There are 2 differents channels (called tag in NPM) of versions :
- `latest`, the default one, for the releases based on git tags named following the convention `@datagouv/components@version`
- `dev`, for our development versions based on `master`

`dev` versions are done automatically and there is nothing to do.
For our releases, a manual update of the version number is necessary. To do so, you can run :

```
npm run update-version -- NEW_VERSION
```

`NEW_VERSION` should be either `major`, `minor` or `patch` to let NPM compute the next version number.

The update triggers a project build and its tests.

Then, you should update the CHANGELOG with the new version and run :

```
npm run commit-tag-and-push
```

It will commit the updated files, make a new tag and push both to your remote.

### Publish a dev version

Even if our `dev` channel is automated, it is sometimes necessary to do a manual version e.g. to test a CI update.

For development versions, you can use `premajor`, `preminor`, `prepatch` and `prerelease` as `NEW_VERSION` for the `update-version` npm script.

Our `dev` channel uses `--preid=dev` to instruct NPM to call our prerelease `.dev`.
If you want to do the same, you should do :

```
npm run update-version -- prerelease --preid=dev
```

## Using a local version in udata-front

The local version of the package is used in udata-front.
There is no `dev` or `build` required, your changes should be picked up with the `inv assets-watch` of udata-front.
