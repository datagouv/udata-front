import { ref, onMounted, toValue, type MaybeRefOrGetter } from 'vue';
import { Organization } from '../../types/organizations';

export default function useOrganizationCertified(organizationRef: MaybeRefOrGetter<Organization>) {
  const PUBLIC_SERVICE = "public-service";
  const CERTIFIED = "certified";
  const organizationCertified = ref(false);
  const isOrganizationCertified = () => {
    const organization = toValue(organizationRef);
    if(!organization) {
      organizationCertified.value = false;
      return;
    }
    organizationCertified.value = organization.badges.some(badge => badge.kind === PUBLIC_SERVICE) &&
      organization.badges.some(badge => badge.kind === CERTIFIED);
  };
  onMounted(isOrganizationCertified);

  return {
    organizationCertified,
  }
}
