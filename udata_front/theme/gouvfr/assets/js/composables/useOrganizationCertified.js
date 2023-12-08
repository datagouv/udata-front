import {ref, onMounted, toValue} from 'vue';

export const PUBLIC_SERVICE = "public-service";

export const CERTIFIED = "certified";

/**
 * Know if an organization is certified or not
 * @param {import("vue").MaybeRefOrGetter<import("../types").Organization>} organizationRef
 */
export default function useOrganizationCertified(organizationRef) {
  const organizationCertified = ref(false);
  const isOrganizationCertified = () => {
    const organization = toValue(organizationRef);
    if(!organization) {
      organizationCertified.value = false;
      return;
    }
    organizationCertified.value = organization.badges.some(badge => badge.kind === PUBLIC_SERVICE) &&
    organization.badges.some(badge => badge.kind === CERTIFIED)
  };
  onMounted(isOrganizationCertified);

  return {
    organizationCertified,
  }
}
