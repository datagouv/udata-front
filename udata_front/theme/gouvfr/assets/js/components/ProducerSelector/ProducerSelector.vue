<template>
  <div v-if="isAdmin()">
    <MultiSelect
      :required="true"
      :minimumCharacterBeforeSuggest="2"
      :placeholder="$t('Check the identity with which you want to publish')"
      :searchPlaceholder="$t('Select an organization')"
      suggestUrl="/organizations/suggest/"
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
      <p class="fr-text--md fr-text--bold fr-mb-n3v">You belong to no organization</p>
      <p class="fr-text--sm fr-text--bold fr-mb-n4v">You publish in your own name</p>
      <p class="fr-text--sm">We advise you to publish under an organization if it's a professional activity</p>
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
import { fetchMe } from '../../api/me';
import type { User, Organization } from '@etalab/data.gouv.fr-components';

const userOrganization = ref<Organization>();
const organizations = ref<Array<Organization>>([]);
const me = ref<User | null>(null);
const emit = defineEmits(['update:organization']);

const isAdmin = () => {
  return me.value?.roles?.includes('admin') ?? false;
};

const hasOrganizations = computed<Boolean>(() => organizations.value.length > 1);

const updateOrganization = (value: Organization) => {
  userOrganization.value = value;
  emit('update:organization', value);
};

async function fetchUser() {
  try {
    me.value = await fetchMe();
    updateOrganizations();
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

function updateOrganizations() {
  const userValue = toValue(me);
  if (userValue) {
    organizations.value = userValue.organizations;
    organizations.value.push({
      name: `${userValue.first_name} ${userValue.last_name}`,
      logo: userValue.avatar || "",
      id: "user",
      acronym: null,
      badges: [],
      page: "",
      slug: "",
      uri: "",
      logo_thumbnail: userValue.avatar_thumbnail || ""
    });
  }
};

onMounted(async () => {
  await fetchUser();
});
</script>
