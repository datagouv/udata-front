import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { Organization } from "../../types/organizations";
import { useI18n } from "vue-i18n";

export const PUBLIC_SERVICE = "public-service";
export const ASSOCIATION = "association";
export const COMPANY = "company";
export const LOCAL_AUTHORITY = "local-authority";
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

export function getOrganizationTypes(): Array<{type: OrganizationTypes | UserType, label: string, icon: string}> {
  const { t } = useI18n();
  return [{
      type: PUBLIC_SERVICE,
      label: t("Public service"),
      icon: "ri-bank-line",
    },
    {
      type: LOCAL_AUTHORITY,
      label: t("Local authority"),
      icon: "ri-government-line",
    },
    {
      type: ASSOCIATION,
      label: t("Association"),
      icon: "ri-community-line",
    },
    {
      type: COMPANY,
      label: t('Company'),
      icon: "ri-building-2-line",
    },
    {
      type: OTHER,
      label: t('Other'),
      icon: "",
    },
    {
      type: USER,
      label: t("User"),
      icon: "ri-user-line",
  }];
}

export function findOrganizationType(searched: OrganizationTypes | UserType) {
  return getOrganizationTypes().find(type => type.type === searched)!
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
