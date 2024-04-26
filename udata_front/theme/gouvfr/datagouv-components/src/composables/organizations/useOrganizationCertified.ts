import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue';
import { Organization } from '../../types/organizations';
import { isType, hasBadge, PUBLIC_SERVICE } from './useOrganizationType';

export const CERTIFIED = "certified";

export default function useOrganizationCertified(organizationRef: MaybeRefOrGetter<Organization | null>) {
  const organizationCertified = ref(false);
  watchEffect(() => {
    const organization = toValue(organizationRef);
    if(!organization) {
      organizationCertified.value = false;
      return;
    }
    organizationCertified.value = isType(organization, PUBLIC_SERVICE) && hasBadge(organization, CERTIFIED);
  });

  return {
    organizationCertified,
  }
}
