import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { Organization } from "../../types/organizations";

export const PUBLIC_SERVICE = "public-service";
export const ASSOCIATION = "Association";
export const COMPANY = "Company";
export const LOCAL_AUTHORITY = "Local authority";
export const OTHER = "other";
export const USER = "user";

export type OrganizationTypes = typeof PUBLIC_SERVICE | typeof ASSOCIATION | typeof COMPANY | typeof LOCAL_AUTHORITY | typeof OTHER;

export type UserType = typeof USER;

/**
 * Checks if the organization has the provided type
 * @param organizationRef the organization
 * @param type the organization type
 */
export function isType(organizationRef: MaybeRefOrGetter<Organization>, type: OrganizationTypes) {
  return hasBadge(organizationRef, type);
}

/**
 * Checks if the organization has the provided badge
 * @param organizationRef the organization
 * @param kind the badge
 */
export function hasBadge(organizationRef: MaybeRefOrGetter<Organization>, kind: string) {
  return toValue(organizationRef).badges.some(badge => badge.kind === kind);
}

export default function useOrganizationType(organizationRef: MaybeRefOrGetter<Organization>) {
  const isPublicService = computed(() => isType(organizationRef, PUBLIC_SERVICE));
  const isAssociation = computed(() => isType(organizationRef, ASSOCIATION));
  const isLocalAuthority = computed(() => isType(organizationRef, LOCAL_AUTHORITY));
  const isCompany = computed(() => isType(organizationRef, COMPANY));
  const type = computed(() => {
    if (isLocalAuthority.value) {
      return LOCAL_AUTHORITY;
    } else if(isPublicService.value) {
      return PUBLIC_SERVICE;
    } else if(isAssociation.value) {
      return ASSOCIATION;
    } else if(isCompany.value) {
      return COMPANY;
    } else {
      return OTHER;
    }
  });
  return {
    type,
  };
}
