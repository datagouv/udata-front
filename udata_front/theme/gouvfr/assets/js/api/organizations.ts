import type { NewOrganization, Organization } from "@datagouv/components/ts";
import { type MaybeRefOrGetter, toValue } from "vue";
import { api } from "../plugins/api";
import { getLocalizedUrl } from "../i18n";
import type { Member, MemberRole, PendingMembershipRequest } from "../types";

type UploadLogoResponse = {
  image: string;
  success: boolean;
};

type ContactPoint = {
  name: string,
  email: string,
  contact_form: string,
}

export function createOrganization(organization: MaybeRefOrGetter<NewOrganization>) {
  return api.post<Organization>("organizations/", {
    ...toValue(organization),
  }).then(resp => resp.data);
}

export function uploadLogo(oid: string, file: File) {
  return api.postForm<UploadLogoResponse>(`organizations/${oid}/logo`, {
    file: file
  }).then(resp => resp.data);
}

export function updateOrganization(organization: MaybeRefOrGetter<Organization>) {
  const organizationValue  = toValue(organization);
  return api.put<Organization>(`organizations/${organizationValue.id}/`, {
    ...organizationValue,
  }).then(resp => resp.data);
}

export function getOrganization(oid: string) {
  return api.get<Organization>(getLocalizedUrl(`organizations/${oid}/`))
    .then(res => res.data);
}

export function deleteOrganization(oid: string) {
  return api.delete<void>(getLocalizedUrl(`organizations/${oid}/`))
    .then(res => res.data);
}

export function getPendingMemberships(oid: string) {
  return api.get<Array<PendingMembershipRequest>>(getLocalizedUrl(`organizations/${oid}/membership/`), {
    params: {
      status: "pending",
    },
  }).then(res => res.data);
}

export type GetRolesResponse = Array<{
  id: MemberRole;
  label: string;
}>;

export function getRoles() {
  return api.get<Array<{id: MemberRole, label: string}>>(getLocalizedUrl("organizations/roles/"))
    .then(res => res.data);
}

export function formatRolesAsOptions(roles: GetRolesResponse) {
  return roles.map(role => {
    return {
      label: role.label,
      value: role.id,
    };
  });
}

export function updateMemberRole(oid: string, id: string, role: MemberRole) {
  return api.put<Member>(getLocalizedUrl(`organizations/${oid}/member/${id}`), {
    role,
  }).then(res => res.data);
}

export function removeMember(oid: string, id: string) {
  return api.delete<void>(`organizations/${oid}/member/${id}`);
}

export function acceptRequest(oid: string, requestId: string) {
  return api.post<Member>(`organizations/${oid}/membership/${requestId}/accept`)
    .then(resp => resp.data);
}

export function refuseRequest(oid: string, requestId: string, comment: string) {
  return api.post<void>(`organizations/${oid}/membership/${requestId}/refuse`, {
    comment,
  })
    .then(resp => resp.data);
}

export function addMember(oid: string, userId: string, role: MemberRole) {
  return api.post<Member>(`organizations/${oid}/member/${userId}`, {
    role,
  })
    .then(resp => resp.data);
}

export function createContactPointOrganization(oid: string, contactPoint: ContactPoint) {
  return api.post<ContactPoint>(`contacts`, {
    ...toValue(contactPoint),
    organization: oid,
  }).then(resp => resp.data);
}

export function getContactsOrganization(oid: string) {
  return api.get<Array<Organization>>(getLocalizedUrl(`organizations/${oid}/contacts`))
    .then(res => res.data);
}