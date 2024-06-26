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
      <p class="fr-text--md fr-text--bold fr-mb-n3v">{{ t('You belong to no organization') }}</p>
      <p class="fr-text--sm fr-text--bold fr-mb-n4v">{{ t('You publish in your own name') }}</p>
      <p class="fr-text--sm">{{ t('We advise you to publish under an organization if it\'s a professional activity') }}</p>
      <div class="fr-grid-row fr-grid-row--middle fr-pb-3v">
        <div class="fr-col-6">
          <a class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500" :href="organizationsUrl">
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
import type { User, Organization } from '@etalab/data.gouv.fr-components';
import { organization_url } from '../../config';
import { useI18n } from 'vue-i18n';
import useUserAvatar from "../../composables/useUserAvatar";

const { t } = useI18n();

const props = defineProps<{
  user: User,
  hasError?: boolean
  errorText?: string
}>();

console.log(props.hasError)

const organizationsUrl = organization_url;
const createOrganizationUrl = `${organization_url}publishing-form/`;

const userOrganization = ref<string>();
const organizations = ref<Array<Organization | User>>([]);
const emit = defineEmits<{
  (event: 'update:organization', organization: Organization): void,
}>();

const isAdmin = computed(() => props.user.roles?.includes('admin') ?? false);

const hasOrganizations = computed(() => organizations.value.length > 1);

const updateOrganization = (value: Organization) => {
  userOrganization.value = value.id;
  emit('update:organization', value);
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

onMounted(() => {
  organizations.value = [];
  listOrganizations();
});
</script>
