<template>
  <div class="fr-container--fluid h-100">
    <div class="fr-grid-row h-100 bg-grey-50">
      <div class="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-col-xl-2">
        <nav
          class="fr-sidemenu fr-pr-0"
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
                <AdminSidebarMenu
                  v-if="user"
                  :user="user"
                  :is-opened="isOpened(user.id)"
                  @open="open(user)"
                />
                <AdminSidebarMenu
                  v-if="me"
                  v-for="organization in me.organizations"
                  :organization="organization"
                  :is-opened="isOpened(organization.id)"
                  @open="() => open(organization)"
                  @click="() => setCurrentOrganization(organization)"
                />
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="fr-col-12 fr-col-md-8 fr-col-lg-9 fr-col-xl-10 h-100 fr-px-2w">
        <router-view :key="route.fullPath" class="fr-container--fluid"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Organization, getRandomId, User } from "@datagouv/components/ts";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import AdminSidebarMenu from "../../components/AdminSidebar/AdminSidebarMenu/AdminSidebarMenu.vue";
import { useCurrentOrganization } from "../../composables/admin/useCurrentOrganization";
import { user } from "../../config";
import type { Me } from "../../types";
import { fetchMe } from "../../api/me";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const menuId = getRandomId("menu");
const me = ref<Me | null>(null);
const opened = ref<string>();
const { setCurrentOrganization } = useCurrentOrganization();
const router = useRouter();

function isOpened(id: string) {
  return id === opened.value;
}

function open(organization: Organization | User) {
  opened.value = organization.id;
}

onMounted(async () => {
  me.value = await fetchMe();
  // When we are on "admin/#/", shows the first organization page, this could be removed when we have an admin "home" page
  if(!route.name) {
    if(me.value.organizations.length > 0) {
      router.replace({name: "organization-datasets", params: {oid: me.value.organizations[0].id}})
    } else {
      router.replace({name: "me"});
    }
  }
  // Opens the menu on "My Profil", this logic will change when we add more pages to this section
  if(route.name === "me") {
    opened.value = user?.id;
    // On another page, opens the 
  } else if(me.value.organizations.length > 0) {
    let organization = me.value.organizations[0];
    if(route.params.oid) {
      organization = me.value.organizations.find(organization => organization.id === route.params.oid) ?? organization;
    }
    open(organization);
    setCurrentOrganization(organization);
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
