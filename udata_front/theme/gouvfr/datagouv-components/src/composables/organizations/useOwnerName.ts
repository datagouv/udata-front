import { type MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue';
import type { Owned } from "../../types/owned";

export default function useOwnerName(owned: MaybeRefOrGetter<Owned | null>) {
  const owner = ref('');
  watchEffect(() => {
    const ownedValue = toValue(owned);
    if(ownedValue) {
      if(ownedValue.organization) {
        owner.value = ownedValue.organization.name;
      } else if(ownedValue.owner) {
        owner.value = ownedValue.owner.first_name + " " + ownedValue.owner.last_name;
      }
    }
  });
  return owner;
}
