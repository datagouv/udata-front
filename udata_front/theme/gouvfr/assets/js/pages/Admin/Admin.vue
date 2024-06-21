<template>
  <div class="fr-container--fluid h-100">
    <div class="fr-grid-row h-100 bg-grey-50">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-col-xl-2">
        <nav
          class="fr-sidemenu"
          :aria-label="t('Administration menu')"
        >
          <div
            class="fr-sidemenu__inner"
          >
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
                    class="fr-sidemenu__btn border-bottom border-default-grey"
                    aria-expanded="false"
                    :aria-controls="profilId"
                  >
                    <Avatar
                      :user="user"
                      :size="24"
                      :rounded="true"
                    />
                    <p class="fr-mx-1v">{{ t('My Profil') }}</p>
                  </button>
                  <div class="fr-collapse" :id="profilId">
                    <AdminSidebarLink
                      icon="fr-icon-account-circle-line"
                      :label="t('Me')"
                      to="/me"
                    />
                  </div>
                </li>
                <AdminSidebarOrganizationMenu
                  v-if="me"
                  v-for="organization in me.organizations"
                  :organization="organization"
                  :is-opened="isCurrent(organization.id)"
                />
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-col-xl-10 h-100 fr-px-2w">
        <router-view :key="route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomId } from "@etalab/data.gouv.fr-components";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Avatar from "../../components/discussions/Avatar/Avatar.vue";
import AdminSidebarLink from "../../components/AdminSidebar/AdminSidebarLink/AdminSidebarLink.vue";
import AdminSidebarOrganizationMenu from "../../components/AdminSidebar/AdminSidebarOrganizationMenu/AdminSidebarOrganizationMenu.vue";
import { user } from "../../config";
import type { Me } from "../../types";
import { fetchMe } from "../../api/me";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const menuId = getRandomId("menu");
const profilId = getRandomId("profil-submenu");
const me = ref<Me | null>(null);

const opened = ref<string | null>(null);

function isCurrent(id: string) {
  return id === opened.value;
}

onMounted(async () => {
  me.value = await fetchMe();
  if(me.value.organizations.length > 0) {
    if(route.params.oid) {
      opened.value = route.params.oid as string;
    } else {
      opened.value = me.value.organizations[0].id;
    }
  }
});
</script>

<style lang="less">
html, body {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.fr-sidemenu .fr-sidemenu__item:first-child:before, .fr-sidemenu .fr-sidemenu__item:last-child:before, .fr-sidemenu .fr-sidemenu__item:before {
  box-shadow: none;
}
</style>
<style lang="less" scoped>
@import "../../../less/variables.less";
.fr-sidemenu {
  padding: 0;
}
.fr-sidemenu .fr-sidemenu__inner {
  padding: 0;
  box-shadow: 1px 0 0 0 @border-default-grey;
  background-color: @white;
}
@media @dsfr-query-md {
  .fr-sidemenu, .fr-sidemenu__inner {
    height: 100%;
  }
}
</style>
