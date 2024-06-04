import { api } from "../plugins/api";

export function deleteUser(oid: string) {
  return api.delete<void>(`users/${oid}/`);
};

export function deleteUserWithoutSendingMail(oid: string) {
  return api.delete<void>(`users/${oid}/?no_mail=true`);
};
