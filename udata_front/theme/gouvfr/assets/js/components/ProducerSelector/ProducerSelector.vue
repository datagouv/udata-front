<template>
  <div v-if="isAdmin">
    <MultiSelect
      :required="true"
      :minimumCharacterBeforeSuggest="2"
      :placeholder="$t('Check the identity with which you want to publish')"
      :searchPlaceholder="$t('Select an organization')"
      suggestUrl="/organizations/suggest/"
      :initialOptions="organizations"
      :values="userOrganization"
      @change="updateOrganization"
      :hasError="props.hasError"
      :errorText="props.errorText"
    />
  </div>
  <div v-else-if="hasOrganizations">
    <MultiSelect
      :required="true"
      :minimumCharacterBeforeSuggest="2"
      :placeholder="$t('Check the identity with which you want to publish')"
      :searchPlaceholder="$t('Select an organization')"
      :initialOptions="organizations"
      :values="userOrganization"
      @change="updateOrganization"
      :hasError="props.hasError"
      :errorText="props.errorText"
    />
  </div>
  <div v-else>
    <div class="fr-col bg-contrast-grey text-align-center fr-p-2v">
      <p class="fr-text--md fr-text--bold fr-my-1w">{{ t('You belong to no organization') }}</p>
      <p class="fr-text--sm fr-text--bold fr-m-0">{{ t('You publish in your own name') }}</p>
      <p class="fr-text--sm fr-mb-1w">{{ t('We advise you to publish under an organization if it\'s a professional activity') }}</p>
      <div class="fr-grid-row fr-grid-row--middle fr-pb-3v">
        <div class="fr-col-6">
          <a class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500" :href="organization_url">
            {{ $t("Join an organization") }}
          </a>
        </div>
        <div class="fr-col-6">
          <a class="fr-btn" :href="createOrganizationUrl">
            {{ $t("Create an organization") }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toValue, onMounted } from 'vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import type { User, Organization } from '@datagouv/components/ts';
import { organization_url } from '../../config';
import type { Me, OwnedWithId } from '../../types';
import { useI18n } from 'vue-i18n';
import useUserAvatar from "../../composables/useUserAvatar";

const { t } = useI18n();

const props = defineProps<{
  user: Me,
  hasError?: boolean,
  errorText?: string,
}>();

const createOrganizationUrl = `${organization_url}publishing-form/`;

const userOrganization = ref<Organization>();
const owned = ref<OwnedWithId>({
  organization: null,
  owner: props.user.id,
});
const organizations = ref<Array<Organization | User>>([]);
const emit = defineEmits<{
  (event: 'update:owned', owned: OwnedWithId): void,
}>();

const isAdmin = computed(() => props.user.roles?.includes('admin') ?? false);

const hasOrganizations = computed(() => organizations.value.length > 1);

const updateOrganization = (organization: string) => {
  if (organization === "user") {
    owned.value.organization = null;
    owned.value.owner = props.user.id;
  } else {
    owned.value.organization = organization;
    owned.value.owner = null;
  };
  emit('update:owned', toValue(owned));
};

function listOrganizations() {
  const userValue = {
    ...toValue(props.user),
    id: "user",
    name: `${props.user.first_name} ${props.user.last_name}`,
    logo: useUserAvatar(toValue(props.user), 40),
    logo_thumbnail: useUserAvatar(toValue(props.user), 40),
  };
  if (userValue) {
    organizations.value = [...userValue.organizations];
    organizations.value.push(userValue);
  };
};

function checkIfNoOrganizations() {
  if (!isAdmin.value && organizations.value.length === 1) {
    updateOrganization("user");
  }
}

onMounted(() => {
  organizations.value = [];
  listOrganizations();
  checkIfNoOrganizations();
});
</script>
