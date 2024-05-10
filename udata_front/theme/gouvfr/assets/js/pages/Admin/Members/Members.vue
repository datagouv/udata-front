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
      </li>
    </Breadcrumb>
    <h1 class="fr-h1 fr-mb-2w">{{ t("Members") }}</h1>
    <template v-if="membershipRequests.length">
      <h2 class="subtitle subtitle--uppercase">
        {{ t("{n} requests", {n: membershipRequests.length}) }}
      </h2>
      <MembershipRequest
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
    <h2 class="subtitle subtitle--uppercase fr-mt-2w fr-mb-1v">
      {{ t("{n} members", {n: members.length}) }}
    </h2>
    <div class="fr-table fr-table--layout-fixed">
      <table>
        <thead>
          <tr>
            <th scope="col">{{ t("Members") }}</th>
            <th scope="col">{{ t("Status") }}</th>
            <th scope="col" v-if="isAdmin">{{ t("Action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.user.id">
            <td>{{ member.user.first_name }} {{ member.user.last_name }}</td>
            <td>
              <p class="fr-badge">{{ getRoleLabel(member.role) }}</p>
            </td>
            <td v-if="isAdmin">
              <button
                class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-pencil-line"
                data-fr-opened="false"
                :aria-controls="getModalId(member.user.id)"
              >
                {{ t("Edit") }}
              </button>
              <Teleport to="body">
                <dialog
                  :aria-labelledby="getModalTitleId(member.user.id)"
                  role="dialog"
                  :id="getModalId(member.user.id)"
                  class="fr-modal"
                >
                  <div class="fr-container fr-container--fluid fr-container-md">
                    <div class="fr-grid-row fr-grid-row--center">
                      <div class="fr-col-12 fr-col-md-8">
                        <div class="fr-modal__body">
                          <div class="fr-modal__header">
                            <button
                              class="fr-btn--close fr-btn"
                              :title="t('Close the modal dialog')"
                              :aria-controls="getModalId(member.user.id)"
                            >
                              {{ t("Close") }}
                            </button>
                          </div>
                          <div class="fr-modal__content">
                            <h1
                              :id="getModalTitleId(member.user.id)"
                              class="fr-modal__title fr-mb-2w"
                            >
                              {{ t("Edit member") }}
                            </h1>
                            <p class="fr-grid-row fr-grid-row--middle fr-text--bold fr-mb-2w">
                              <Avatar
                                class="fr-mr-1v"
                                :user="member.user"
                                :rounded="true"
                                :size="24"
                              />
                              {{ member.user.first_name }} {{ member.user.last_name }}
                            </p>
                            <form
                              class="fr-grid-row fr-grid-row--gutters fr-grid-row--bottom"
                              @submit.prevent="updateRole(member)"
                            >
                              <div class="fr-col">
                                <SelectGroup
                                  :label="t('Role of the member')"
                                  v-if="roles.length > 0"
                                  :model-value="member.role"
                                  @update:model-value="(newRole) => member.newRole = (newRole as MemberRole)"
                                  :options="getRolesWithSelected(member.role)"
                                />
                              </div>
                              <div class="fr-col-auto">
                                <button
                                  class="fr-btn"
                                  type="submit"
                                  :disabled="loading"
                                >
                                  {{ t("Validate") }}
                                </button>
                              </div>
                            </form>
                            <AdminDangerZone
                              class="fr-mt-2w"
                            >
                              <div class="fr-col">
                                <p class="fr-m-0 text-grey-500">{{ t('Remove member from the organization') }}</p>
                                <p class="fr-m-0 fr-text--xs text-default-error">{{ t("Be careful, this action can't be reverse.") }}</p>
                              </div>
                              <div class="fr-col-auto">
                                <button
                                  class="fr-btn fr-btn--secondary fr-btn--secondary--error fr-btn--icon-left fr-icon-logout-box-r-line"
                                  :disabled="loading"
                                  @click="removeMemberFromOrganization(member)"
                                >
                                  {{ t('Remove member') }}
                                </button>
                              </div>
                            </AdminDangerZone>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              </Teleport>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { acceptRequest, formatRolesAsOptions, getOrganization, getPendingMemberships, getRoles, refuseRequest, removeMember, updateMemberRole } from "../../../api/organizations";
import AdminDangerZone from "../../../components/AdminDangerZone/AdminDangerZone.vue";
import Avatar from "../../../components/discussions/Avatar/Avatar.vue";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.vue";
import SelectGroup, { type Option } from "../../../components/Form/SelectGroup/SelectGroup.vue";
import MembershipRequest from "../../../components/MembershipRequest/MembershipRequest.vue";
import type { EditingMember, Member, MemberRole, PendingMembershipRequest } from "../../../types";
import { useToast } from "../../../composables/useToast";
import { user, userIsAdmin } from "../../../config";

const props = defineProps<{oid: string}>();

const { t } = useI18n();

const { toast } = useToast();

const membershipRequests = ref<Array<PendingMembershipRequest>>([]);

const isAdmin = computed(() => userIsAdmin || members.value.some(member => member.user.id === user?.id && member.role === "admin"));

const roles = ref<Array<Option>>([]);

// TODO : use `useCurrentOrganization` when merged
const currentOrganization = {name: "SomeName"};

const members = ref<Array<EditingMember>>([]);

const loading = ref(false);

function getModalId(id: string) {
  return "fr-modal-user-" + id;
}

function getModalTitleId(id: string) {
  return "fr-modal-title-user-" + id;
}

function closeModal(memberId: string) {
  const modal = document.getElementById(getModalId(memberId));
  globalThis.dsfr(modal).modal.conceal();
}

async function updateRole(member: EditingMember) {
  if(!member.newRole) {
    closeModal(member.user.id);
    return;
  }
  try {
    loading.value = true;
    await updateMemberRole(props.oid, member.user.id, member.newRole);
    updateMembers();
    closeModal(member.user.id);
  } catch (e) {
    toast.error(t("An error occurred while updating the member role."));
  } finally {
    loading.value = false;
  }
}

async function removeMemberFromOrganization(member: Member) {
  try {
    loading.value = true;
    await removeMember(props.oid, member.user.id);
    updateMembers();
  } catch (e) {
    toast.error(t("An error occurred while removing this member."));
  } finally {
    loading.value = false;
  }
}

function getRoleLabel(role: MemberRole) {
  return roles.value.find(memberRole => memberRole.value === role)?.label ?? role;
}

function getRolesWithSelected(role: MemberRole) {
  return roles.value.map(memberRole => {
    const updatedMemberRole = {...memberRole};
    if(updatedMemberRole.value === role) {
      updatedMemberRole.selected = true;
    }
    return updatedMemberRole;
  });
}

async function updateMembers() {
  const organization = await getOrganization(props.oid);
  members.value = organization.members;
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
