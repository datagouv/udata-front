import {readonly, ref, toValue} from 'vue';

/**
 * Get organization name of owner full name
 * @param {import("vue").MaybeRefOrGetter<import("../types").Owned>} owned - The resource, dataset or reuse owned by an organization or a user.
 * @return {Readonly<import("vue").Ref<string>>}
 */
export default function useOwnerName(owned) {
  owned = toValue(owned);
  const owner = ref('');
  if(!owned) {
    return owner;
  }
  if(owned.organization) {
    owner.value = owned.organization.name;
  } else if(owned.owner) {
    owner.value = owned.owner.first_name + " " + owned.owner.last_name;
  }
  return readonly(owner);
}
