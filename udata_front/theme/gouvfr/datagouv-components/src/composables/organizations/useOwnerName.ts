import { type MaybeRefOrGetter, toValue, computed } from 'vue';
import type { Owned } from "../../types/owned";

export default function useOwnerName(owned: MaybeRefOrGetter<Owned | null>) {
  const owner = computed(() => {
    const ownedValue = toValue(owned);
    if(ownedValue) {
      if(ownedValue.organization) {
        return ownedValue.organization.name;
      } else {
        return ownedValue.owner.first_name + " " + ownedValue.owner.last_name;
      }
    }
  });

  return owner;
}
