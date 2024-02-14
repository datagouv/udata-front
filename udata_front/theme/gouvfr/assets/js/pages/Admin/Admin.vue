<template>
  <div class="fr-container--fluid h-100">
    <div class="fr-grid-row h-100 bg-grey-50">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-col-xl-2">
        <nav class="fr-sidemenu" :aria-label="t('Administration menu')">
          <div class="fr-sidemenu__inner fr-p-1v bg-white">
            <button
              class="fr-sidemenu__btn"
              hidden
              :aria-controls="menuId"
              aria-expanded="false"
            >
              {{ t('Open menu') }}
            </button>
            <div class="fr-collapse" :id="menuId">
              <ul class="fr-sidemenu__list">
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    :aria-controls="profilId"
                  >
                    Profil
                  </button>
                  <div class="fr-collapse" :id="profilId">

                  </div>
                </li>
              </ul>
              <ul class="fr-sidemenu__list">
                <li
                  class="fr-sidemenu__item"
                  :class="activeMenuClass(organizationId)"
                >
                  <button
                    class="fr-sidemenu__btn"
                    :aria-expanded="isCurrent(organizationId)"
                    :aria-controls="organizationId"
                    :aria-current="isCurrent(organizationId)"
                  >
                    Mon organisation
                  </button>
                  <div class="fr-collapse" data-fr-js-collapse :id="organizationId">
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a class="fr-sidemenu__link" href="#" target="_self">
                          Jeux de données
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getRandomId } from "@etalab/data.gouv.fr-components";

const { t } = useI18n();
const menuId = getRandomId("menu");
const profilId = getRandomId("profil-submenu");
const organizationId = getRandomId("organization-submenu");

const currentMenuOpened = organizationId;

function isCurrent(id: string) {
  return currentMenuOpened === id;
}

function activeMenuClass(id: string) {
  return {
    'fr-sidemenu__item--active': isCurrent(id),
  };
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
