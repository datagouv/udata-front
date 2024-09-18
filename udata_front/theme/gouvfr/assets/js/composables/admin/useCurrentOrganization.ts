import type { Organization } from "@datagouv/components/ts";
import { readonly, ref } from "vue";

const currentOrganization = ref<Organization | null>(null);

export function useCurrentOrganization() {
  const setCurrentOrganization = (organization: Organization) => {
    currentOrganization.value = organization;
  }

  return {
    currentOrganization: readonly(currentOrganization),
    setCurrentOrganization,
  };
}
