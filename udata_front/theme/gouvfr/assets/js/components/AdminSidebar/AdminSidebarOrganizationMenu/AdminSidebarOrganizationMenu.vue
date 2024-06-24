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
    >
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
    </button>
    <div class="fr-collapse" data-fr-js-collapse :id="id">
      <ul class="fr-sidemenu__list fr-mx-1w fr-my-3v">
        <AdminSidebarLink
          :iconHtml="DatabaseIcon"
          :label="t('Datasets')"
          :to="{name: 'organization-datasets', params: {oid: organization.id}}"
        />
        <AdminSidebarLink
          icon="fr-icon-line-chart-line"
          :label="t('Reuses')"
          :to="{name: 'organization-reuses', params: {oid: organization.id}}"
        />
        <AdminSidebarLink
          icon="fr-icon-parent-line"
          :label="t('Members')"
          :to="{name: 'organization-members', params: {oid: organization.id}}"
        />
        <AdminSidebarLink
          icon="fr-icon-user-line"
          :label="t('Profile')"
          :to="{name: 'organization-profile', params: {oid: organization.id}}"
        />
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import type { Organization } from '@etalab/data.gouv.fr-components';
export type AdminSidebarOrganizationMenuProps = {
  organization: Organization,
  isOpened: boolean,
};
</script>
<script setup lang="ts">
import DatabaseIcon from 'iconoir/icons/regular/database.svg?raw';
import { useI18n } from "vue-i18n";
import Placeholder from "../../../components/utils/placeholder.vue";
import AdminSidebarLink from "../AdminSidebarLink/AdminSidebarLink.vue";
import { getRandomId } from '@etalab/data.gouv.fr-components';

const props = defineProps<AdminSidebarOrganizationMenuProps>();
const { t } = useI18n();
const id = getRandomId("organization-menu");
</script>
<style scoped>

.fr-sidemenu__btn {
  background-color: var(--background-alt-grey);
  border-bottom: 1px solid var(--border-default-grey);
}

.fr-sidemenu__btn:hover {
  background-color: var(--background-alt-grey-hover);
}

.fr-sidemenu__btn:active {
  background-color: var(--background-alt-grey-active);
}

.fr-sidemenu__btn[aria-current] {
  background-color: var(--background-default-grey);
  color: var(--text-default-grey);
}

.fr-sidemenu__btn[aria-current]::before {
  width: 0;
}

.fr-sidemenu__btn[aria-current]:hover {
  background-color: var(--hover-tint);
}

.fr-sidemenu__btn[aria-current]:active {
  background-color: var(--active-tint);
}
</style>
