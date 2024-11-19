import { config } from "../config";
import type { User } from "../types/users";

/**
 * @deprecated use `getUserAvatar` instead, it isn't a composable so it shouldn't use the `use` convention
 */
export function useUserAvatar(user: User, size: number) {
  return getUserAvatar(user, size);
}

export default function getUserAvatar(user: User, size: number) {
  const getIdenticon = (id: string, size: number) => `${config.api_root}avatars/${id}/${size}`;
  return user.avatar_thumbnail || getIdenticon(user.id, size);
}
