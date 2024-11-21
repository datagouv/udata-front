<template>
  <div>
    <Breadcrumb>
      <li>
        <router-link class="fr-breadcrumb__link" to="/">
          {{ t('Administration') }}
        </router-link>
      </li>
      <li v-if="currentOrganization">
        <router-link class="fr-breadcrumb__link" to="/">
          {{ currentOrganization.name }}
        </router-link>
      </li>
      <li>
        <a class="fr-breadcrumb__link" aria-current="page">
          {{ t('Members') }}
        </a>
      </li>
    </Breadcrumb>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle justify-center">
      <div class="fr-col-12 fr-col-md">
        <h1 class="fr-h3 fr-mb-0">{{ t("Members") }}</h1>
      </div>
      <div class="fr-col-auto" v-if="isAdmin">
        <AdminAddMemberButton
          :oid="oid"
          :roles="roles"
          @member-added="updateMembers"
        />
      </div>
    </div>
    <template v-if="membershipRequests.length">
      <h2 class="subtitle subtitle--uppercase fr-mt-5v fr-mb-0">
        {{ t("{n} requests", {n: membershipRequests.length}) }}
      </h2>
      <AdminMembershipRequest
        class="fr-mb-4w"
        v-for="request in membershipRequests"
        :key="request.id"
        :loading="loading"
        :oid="oid"
        :request="request"
        :show-actions="true"
        @accept="accept"
        @refuse="refuse"
      />
    </template>
    <h2
      class="subtitle subtitle--uppercase fr-mb-0"
      :class="{'fr-mt-n3v': membershipRequests.length, 'fr-mt-5v': !membershipRequests.length}"
    >
      {{ t("{n} members", {n: members.length}) }}
    </h2>
    <AdminTable class="fr-table--layout-fixed" :loading>
      <thead>
        <tr>
          <AdminTableTh scope="col">{{ t("Members") }}</AdminTableTh>
          <AdminTableTh scope="col">{{ t("Status") }}</AdminTableTh>
          <AdminTableTh scope="col">{{ t("Member since") }}</AdminTableTh>
          <AdminTableTh scope="col">{{ t("Last connection") }}</AdminTableTh>
          <AdminTableTh scope="col" v-if="isAdmin">{{ t("Action") }}</AdminTableTh>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.user.id">
          <td>
            <p class="fr-text--bold fr-m-0">{{ member.user.first_name }} {{ member.user.last_name }}</p>
            <p class="fr-m-0 fr-text--xs text-mention-grey f-italic inline-flex items-center">
              <Vicon
                :height="12"
                :width="12"
                name="ri-mail-line"
              />
              <Tooltip>
                <TextClamp class="fr-px-1v" :text="member.user.email" :auto-resize="true" :max-lines="1" />
              </Tooltip>
            </p>
          </td>
          <td>
            <AdminBadge :type="getStatusType(member.role)">{{ getStatus(member.role) }}</AdminBadge>
          </td>
          <td>{{ formatDate(member.since) }}</td>
          <td>
            <span v-if="member.user.last_login_at">{{ formatFromNow(member.user.last_login_at) }}</span>
            <span v-else>{{ t("No connection") }}</span>
          </td>
          <td v-if="isAdmin">
            <AdminEditMemberButton
              :member="member"
              :oid="oid"
              :roles="roles"
              @member-updated="updateMembers"
            />
          </td>
        </tr>
      </tbody>
    </AdminTable>
  </div>
</template>

<script setup lang="ts">
import { formatDate, formatFromNow } from '@datagouv/components/ts';
import { OhVueIcon as Vicon, addIcons } from "oh-vue-icons";
import { RiMailLine } from "oh-vue-icons/icons";
import { computed, onMounted, ref, watchEffect } from "vue";
import TextClamp from 'vue3-text-clamp';
import { useI18n } from "vue-i18n";
import { acceptRequest, formatRolesAsOptions, getOrganization, getPendingMemberships, getRoles, refuseRequest } from "../../../api/organizations";
import AdminAddMemberButton from "../../../components/AdminAddMember/AdminAddMemberButton.vue";
import AdminBadge from '../../../components/AdminBadge/AdminBadge.vue';
import AdminEditMemberButton from "../../../components/AdminEditMember/AdminEditMemberButton.vue";
import AdminMembershipRequest from "../../../components/AdminMembershipRequest/AdminMembershipRequest.vue";
import AdminTable from '../../../components/AdminTable/Table/AdminTable.vue';
import AdminTableTh from '../../../components/AdminTable/Table/AdminTableTh.vue';
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import { type Option } from "../../../components/Form/SelectGroup/SelectGroup.vue";
import Tooltip from '../../../components/Tooltip/Tooltip.vue';
import { useCurrentOrganization } from "../../../composables/admin/useCurrentOrganization";
import { useToast } from "../../../composables/useToast";
import { user, userIsAdmin } from "../../../config";
import type { AdminBadgeState, EditingMember, MemberRole, PendingMembershipRequest } from "../../../types";

const props = defineProps<{oid: string}>();

addIcons(RiMailLine);

const { t } = useI18n();

const { toast } = useToast();

const membershipRequests = ref<Array<PendingMembershipRequest>>([]);

const isAdmin = computed(() => userIsAdmin || members.value.some(member => member.user.id === user?.id && member.role === "admin"));

const roles = ref<Array<Option>>([]);

const { currentOrganization } = useCurrentOrganization();

const members = ref<Array<EditingMember>>([]);

const loading = ref(false);

function getStatus(role: MemberRole): string {
  return roles.value.find(memberRole => memberRole.value === role)?.label ?? role;
}

function getStatusType(role: MemberRole): AdminBadgeState {
  return role === "admin" ? 'info' : 'default';
}

async function updateMembers() {
  loading.value = true;
  members.value = [];
  try {
    const organization = await getOrganization(props.oid);
    members.value = organization.members;
  } finally {
    loading.value = false;
  }
}

async function updateMemberships() {
  const memberships = await getPendingMemberships(props.oid);
  membershipRequests.value = memberships;
}

async function accept(id: string) {
  loading.value = true;
  const promises = [];
  try {
    await acceptRequest(props.oid, id);
    promises.push(updateMemberships());
    promises.push(updateMembers());
  } catch(e) {
    toast.error(t("An error occurred while accepting this membership."));
  } finally {
    Promise.all(promises).finally(() => loading.value = false);
  }
}

async function refuse(id: string, comment: string) {
  loading.value = true;
  const promises = [];
  try {
    await refuseRequest(props.oid, id, comment);
    promises.push(updateMemberships());
    promises.push(updateMembers());
  } catch(e) {
    toast.error(t("An error occurred while refusing this membership."));
  } finally {
    Promise.all(promises).finally(() => loading.value = false);
  }
}

watchEffect(() => {
  if(isAdmin.value) {
    getPendingMemberships(props.oid).then(requests => membershipRequests.value = requests);
  }
});

onMounted(() => {
  getRoles().then(formatRolesAsOptions).then(options => roles.value = options);
  updateMembers();
});
</script>
