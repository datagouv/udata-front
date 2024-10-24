<template>
  <div>
    <div>
      <MultiSelect
        :required="true"
        :minimumCharacterBeforeSuggest="2"
        :placeholder="t('Chose the contact point with which you want to publish')"
        :searchPlaceholder="t('Select a contact point')"
        :initialOptions="contactsToShow"
        @change="updateContactPoint"
        :hasError="props.hasError"
        :errorText="props.errorText"
      />
    </div>
    <br />
    <div v-if="isNewContact" class="fr-fieldset__element">
      <InputGroup
        :label="t('Contact Name')"
        v-model="newContact.name"
        @change="updateNewContact"
      />
      <InputGroup
        :label="t('Contact Email')"
        :placeholder="t('contact [at] organization.org')"
        v-model="newContact.email"
        @change="updateNewContact"
        :hasError="validateEmail()"
        :errorText="t('The value is not a valid email')"
      />
      <InputGroup
        type="url"
        :label="t('Contact URL')"
        :placeholder="t('https://...')"
        v-model="newContact.contact_form"
        @change="updateNewContact"
        :hasError="validateUrl()"
        :errorText="t('The value is not a valid URL address')"
      />
    </div>
    <div v-else>
      <div class="fr-fieldset__element" v-if="contact?.email">{{ t("Contact mail:") }} {{ contact.email }}</div>
      <div class="fr-fieldset__element" v-if="contact?.contact_form">{{ t("Contact link:") }} {{ contact.contact_form }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toValue, onMounted, watch} from 'vue';
import MultiSelect from '../../components/MultiSelect/MultiSelect.vue';
import InputGroup from '../../components/Form/InputGroup/InputGroup.vue';
import type { ContactPoint } from '../../types';
import { useI18n } from 'vue-i18n';
import { getContactsOrganization } from '../../api/organizations';
import { url, email } from '@vuelidate/validators';
import useFunctionalState from '../../composables/form/useFunctionalState';

const { t } = useI18n();

const contactsWithNewOption = ref<any>(null);

const contacts = ref<Array<ContactPoint>>(null);
const contactsToShow = ref<Array<ContactPoint>>(null);
const contact = ref<ContactPoint>(null);
const isNewContact = ref(false);
const newContact = ref({});


const props = defineProps<{
  oid: string,
}>();


const emit = defineEmits<{
  (event: 'update:contact', isNewContact: boolean, contact: ContactPoint): void,
  (event: 'update:newcontact', isNewContact: boolean, contact: ContactPoint): void,
}>();

const updateContactPoint = (contactPointId: any) => {
  if (contactPointId == "new"){
    isNewContact.value = true;
    contact.value = null;
    contactsToShow.value = contacts.value
    emit('update:contact', isNewContact.value, contact.value);
  } else {
    isNewContact.value = false;
    contact.value = contacts.value.find((contact: ContactPoint) => contact.id === contactPointId);
    contactsToShow.value = contacts.value.filter((contact: ContactPoint) => contact.id != contactPointId);
    emit('update:contact', isNewContact.value, contact.value);
  }
};

const updateNewContact = (contactPointId: any) => {
  isNewContact.value = true;
  emit('update:contact', isNewContact.value, newContact.value);
};

const fetchContacts = async (oid: string) => {
  let res = await getContactsOrganization(oid);
  contacts.value = res.data;
  contacts.value.push({ id: "new", name: t("New Contact") });
  contactsToShow.value = contacts.value;
};

onMounted(async() => {
  await fetchContacts(props.oid);
});

watch(() => props.oid, async (newOid: string) => {
  await fetchContacts(newOid);
});

const validateUrl = (param: string) => {
  if (newContact.value?.contact_form) {
    return !url.$validator(newContact.value.contact_form);
  } else {
    return false;
  }
};

const validateEmail = () => {
  if (newContact.value?.email) {
    return !email.$validator(newContact.value.email);
  } else {
    return false;
  }
};

</script>
