import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import type { Member, MemberRole, OrganizationV1, PendingMembershipRequest } from "../types";


export function getOrganization(oid: string) {
  return api.get<OrganizationV1>(getLocalizedUrl(`organizations/${oid}/`))
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
