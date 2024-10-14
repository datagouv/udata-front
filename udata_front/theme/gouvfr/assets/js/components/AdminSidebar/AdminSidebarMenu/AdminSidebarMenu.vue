<template>
  <li
    class="fr-sidemenu__item"
    :class="{'fr-sidemenu__item--active': isOpened}"
  >
    <button
      class="fr-sidemenu__btn"
      :aria-expanded="isOpened"
      :aria-controls="id"
      :aria-current="isOpened"
      @click="$emit('open')"
    >
    <template v-if="user">
      <Avatar
        v-if="user"
        :user="user"
        :size="24"
        :rounded="true"
      />
      <p class="fr-mx-1w">{{ t('My Profil') }}</p>
    </template>
    <template v-else-if="organization">
      <div class="logo logo--sm">
        <Placeholder
          type="organization"
          :src="organization.logo_thumbnail"
          :size="20"
        />
      </div>
      <p class="fr-mx-1w fr-col text-overflow-ellipsis">
        {{ organization.name }}
      </p>
    </template>
    </button>
    <div class="fr-collapse" data-fr-js-collapse :id="id">
      <ul class="fr-sidemenu__list fr-mx-1w fr-my-3v">
        <template v-if="user">
          <AdminSidebarLink
            icon="fr-icon-account-circle-line"
            :label="t('Me')"
            :to="{name: 'me'}"
            />
          <AdminSidebarLink
          :iconHtml="DatabaseIcon"
          :label="t('Datasets')"
          :to="{name: 'me-datasets'}"
          />
          <AdminSidebarLink
          icon="fr-icon-code-s-slash-line"
          :label="t('Dataservices')"
          :to="{name: 'me-dataservices'}"
          />
          <AdminSidebarLink
            icon="fr-icon-line-chart-line"
            :label="t('Reuses')"
            :to="{name: 'me-reuses'}"
          />
          <AdminSidebarLink
          icon="fr-icon-git-pull-request-line"
          :label="t('Community Resources')"
          :to="{name: 'me-community-resources'}"
          />
        </template>
        <template v-else-if="organization">
          <AdminSidebarLink
            :iconHtml="DatabaseIcon"
            :label="t('Datasets')"
            :to="{name: 'organization-datasets', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-code-s-slash-line"
            :label="t('Dataservices')"
            :to="{name: 'organization-dataservices', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-line-chart-line"
            :label="t('Reuses')"
            :to="{name: 'organization-reuses', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-chat-3-line"
            :label="t('Discussions')"
            :to="{name: 'organization-discussions', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-parent-line"
            :label="t('Members')"
            :to="{name: 'organization-members', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-server-line"
            :label="t('Harvesters')"
            :to="{name: 'organization-harvesters', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
            icon="fr-icon-git-pull-request-line"
            :label="t('Community Resources')"
            :to="{name: 'organization-community-resources', params: {oid: organization.id}}"
            @click="$emit('click')"
          />
          <AdminSidebarLink
          icon="fr-icon-user-line"
          :label="t('Profile')"
          :to="{name: 'organization-profile', params: {oid: organization.id}}"
          @click="$emit('click')"
        />
        </template>
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import type { Organization, User } from '@datagouv/components/ts';
export type AdminSidebarMenuProps = {
  /**
   * The logged in user, to show a menu with an avatar and "My Profil"
   */
  user?: User,
  /**
   * An organization, to show a menu with its logo and name
   */
  organization?: Organization,
  /**
   * Show the menu opened or closes
   */
  isOpened: boolean,
};
</script>
<script setup lang="ts">
import { Avatar, getRandomId } from '@datagouv/components/ts';
import DatabaseIcon from 'iconoir/icons/regular/database.svg?raw';
import { watchPostEffect } from "vue";
import { useI18n } from "vue-i18n";
import Placeholder from "../../../components/utils/placeholder.vue";
import AdminSidebarLink from "../AdminSidebarLink/AdminSidebarLink.vue";

const props = defineProps<AdminSidebarMenuProps>();

defineEmits<{
  (event: 'open'): void,
  (event: 'click'): void,
}>();

const { t } = useI18n();
const id = getRandomId("menu");

function openCollapse(isOpened, dsfr) {
  const element = document.getElementById(id);
  if(!dsfr(element)) {
    return;
  }
  if(isOpened) {
    dsfr(element).collapse.disclose();
  } else {
    dsfr(element).collapse.conceal();
  }
}

watchPostEffect(() => {
  // We must wait for the DSFR to catch the `data-fr-js-collapse` before using it.
  setTimeout(() => {
    openCollapse(props.isOpened, globalThis.dsfr);
  }, 200);
});
</script>
<style scoped>
.fr-sidemenu__btn {
  background-color: var(--background-alt-grey);
  border-bottom: 1px solid var(--border-default-grey);
  color: var(--text-default-grey);
}

.fr-sidemenu__btn:hover {
  background-color: var(--background-alt-grey-hover);
}

.fr-sidemenu__btn:active {
  background-color: var(--background-alt-grey-active);
}

.fr-sidemenu__btn[aria-current]:not([aria-current=false]) {
  background-color: var(--background-default-grey);
  color: var(--text-default-grey);
}

.fr-sidemenu__btn[aria-current]:not([aria-current=false])::before {
  width: 0;
}

.fr-sidemenu__btn[aria-current]:not([aria-current=false]):hover {
  background-color: var(--hover-tint);
}

.fr-sidemenu__btn[aria-current]:not([aria-current=false]):active {
  background-color: var(--active-tint);
}

.fr-sidemenu .fr-collapse {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
}

.fr-sidemenu .fr-collapse.fr-collapse--expanded {
  border-bottom: 1px solid var(--border-default-grey);
}
</style>
