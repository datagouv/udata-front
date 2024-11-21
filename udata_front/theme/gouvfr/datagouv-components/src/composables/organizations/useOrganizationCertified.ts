import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { Organization } from '../../types/organizations';
import { isType, hasBadge, PUBLIC_SERVICE, LOCAL_AUTHORITY } from './useOrganizationType';

export const CERTIFIED = "certified";

export default function useOrganizationCertified(organizationRef: MaybeRefOrGetter<Organization | null>) {
  const organizationCertified = computed(() => {
    const organization = toValue(organizationRef);
    if(!organization) {
      return false;
    };
    return hasBadge(organization, CERTIFIED) && (isType(organization, PUBLIC_SERVICE) || isType(organization, LOCAL_AUTHORITY));
  });

  return {
    organizationCertified,
  }
}
