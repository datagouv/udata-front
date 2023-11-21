import { ref, onMounted, toValue } from 'vue';

/**
 * @typedef Organization
 * @property {string?} acronym
 * @property {string} id
 * @property {string} name
 * @property {string} uri
 * @property {string} slug
 * @property {string} page
 * @property {string} logo
 * @property {string} logo_thumbnail
 * @property {Array<{kind: string}>} badges
 */

/**
 *
 * @param {import("vue").MaybeRefOrGetter<Organization>} organizationRef
 * @returns
 */
export default function useOrganizationCertified(organizationRef) {
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
    organization.badges.some(badge => badge.kind === CERTIFIED)
  };
  onMounted(isOrganizationCertified);

  return {
    organizationCertified,
  }
}
