import { computed, readonly, ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue";
import type { Organization } from "../../types/organizations";

export const PUBLIC_SERVICE = "public-service";
export const ASSOCIATION = "Association";
export const COMPANY = "Company";
export const LOCAL_AUTHORITY = "Local authority";

export type OrganizationTypes = typeof PUBLIC_SERVICE | typeof ASSOCIATION | typeof COMPANY | typeof LOCAL_AUTHORITY;

export function isType(organizationRef: MaybeRefOrGetter<Organization>, type: OrganizationTypes) {
  return hasBadge(organizationRef, type);
}

export function hasBadge(organizationRef: MaybeRefOrGetter<Organization>, kind: string) {
  return toValue(organizationRef).badges.some(badge => badge.kind === kind);
}

export default function useOrganizationType(organizationRef: MaybeRefOrGetter<Organization>) {
  const type = ref<OrganizationTypes>(COMPANY);
  const isPublicService = computed(() => isType(organizationRef, PUBLIC_SERVICE));
  const isAssociation = computed(() => isType(organizationRef, ASSOCIATION));
  const isLocalAuthority = computed(() => isType(organizationRef, LOCAL_AUTHORITY));
  watchEffect(() => {
    if(isPublicService.value) {
      type.value = PUBLIC_SERVICE;
    } else if(isAssociation.value) {
      type.value = ASSOCIATION;
    } else if (isLocalAuthority.value) {
      type.value = LOCAL_AUTHORITY;
    } else {
      type.value = COMPANY;
    }
  });
  return {
    type: readonly(type),
  };
}
