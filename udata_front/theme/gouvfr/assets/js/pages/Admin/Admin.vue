<template>
  <div class="fr-container--fluid h-100">
    <div class="fr-grid-row h-100 bg-grey-50">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-col-xl-2">
        <nav class="fr-sidemenu" :aria-label="t('Administration menu')">
          <div class="fr-sidemenu__inner">
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
                    disabled
                  >
                    <Avatar
                      :user="user"
                      :size="24"
                      :rounded="true"
                    />
                    <p class="fr-mx-1v">{{ t('My Profil') }}</p>
                  </button>
                  <div class="fr-collapse" :id="profilId">
                  </div>
                </li>
                <AdminSidebarOrganizationMenu
                  name="data.gouv.fr"
                  :is-opened="isCurrent(organizationId)"
                />
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-col-xl-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomId } from "@etalab/data.gouv.fr-components";
import Avatar from "../../components/discussions/Avatar/Avatar.vue";
import AdminSidebarOrganizationMenu from "../../components/AdminSidebar/AdminSidebarOrganizationMenu/AdminSidebarOrganizationMenu.vue";
import { user } from "../../config";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const menuId = getRandomId("menu");
const profilId = getRandomId("profil-submenu");
const organizationId = getRandomId("organization-submenu");

const opened = ref(organizationId);

function isCurrent(id: string) {
  return id === opened.value;
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

.fr-sidemenu {
  padding: 0;
}

.fr-sidemenu__inner {
  padding: 0;
  box-shadow: 1px 0 0 0 var(--border-default-grey);
  background-color: var(--background-default-grey);
}
</style>
