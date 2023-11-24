import { type MaybeRefOrGetter, ref, toValue } from 'vue';
import type { Organization } from "../../types/organizations";
/**
 * A resource, dataset, reuse or any other object owned by an organization or a user.
 */
export type Owned = {
  organization?: Organization;
  owner?: { first_name: string; last_name: string; };
}

export default function useOwnerName(owned: MaybeRefOrGetter<Owned>) {
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
  return owner;
}
