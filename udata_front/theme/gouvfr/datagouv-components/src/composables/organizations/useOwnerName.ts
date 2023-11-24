import { type MaybeRefOrGetter, ref, toValue } from 'vue';
import type { Owned } from "../../types/owned";

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
