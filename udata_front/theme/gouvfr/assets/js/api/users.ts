import { api } from "../plugins/api";

export function deleteUser(oid: string) {
  return api.delete<void>(`users/${oid}/`);
};

export function deleteUserAsSpam(oid: string) {
  // Don't notify user of its deletion and delete its comments
  return api.delete<void>(`users/${oid}/?no_mail=true&delete_comments=true`);
};
