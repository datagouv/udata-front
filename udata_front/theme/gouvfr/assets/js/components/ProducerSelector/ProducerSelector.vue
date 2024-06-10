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
    />
  </div>
  <div v-else>
    <div class="fr-col bg-contrast-grey text-align-center fr-p-2v">
      <p class="fr-text--md fr-text--bold fr-mb-n3v">{{ t('You belong to no organization') }}</p>
      <p class="fr-text--sm fr-text--bold fr-mb-n4v">{{ t('You publish in your own name') }}</p>
      <p class="fr-text--sm">{{ t('We advise you to publish under an organization if it\'s a professional activity') }}</p>
      <div class="fr-grid-row fr-grid-row--middle fr-pb-3v">
        <div class="fr-col-6">
          <button class="fr-btn fr-btn--secondary fr-btn--secondary-grey-500" @click="">
            {{ $t("Join an organization") }}
          </button>
        </div>
        <div class="fr-col-6">
          <button class="fr-btn" @click="">
            {{ $t("Create an organization") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toValue, onMounted } from 'vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import type { User, Organization } from '@etalab/data.gouv.fr-components';
import { useI18n } from 'vue-i18n';
import useUserAvatar from "../../composables/useUserAvatar";

const { t } = useI18n();

const props = defineProps<{user: User}>();

const userOrganization = ref<Organization>();
const organizations = ref<Array<Organization>>([]);
const emit = defineEmits<{
  (event: 'update:organization', organization: Organization): void,
}>();

const isAdmin = computed(() => props.user.roles?.includes('admin') ?? false);

const hasOrganizations = computed(() => organizations.value.length > 1);

const updateOrganization = (value: Organization) => {
  userOrganization.value = value;
  emit('update:organization', value);
};

function listOrganizations() {
  const userValue = toValue(props.user);
  if (userValue) {
    organizations.value = [...userValue.organizations];
    organizations.value.push({
      name: `${userValue.first_name} ${userValue.last_name}`,
      logo: useUserAvatar(userValue, 40),
      id: "user",
      acronym: null,
      badges: [],
      page: "",
      slug: "",
      uri: "",
      logo_thumbnail: useUserAvatar(userValue, 40),
    });
  };
};

onMounted(() => {
  organizations.value = [];
  listOrganizations();
});
</script>
