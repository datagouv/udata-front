import { config } from "../config";
import type { User } from "../types/users";

export default function useUserAvatar(user: User, size: number) {
  const getIdenticon = (id: string, size: number) => `${config.api_root}avatars/${id}/${size}`;
  return user.avatar_thumbnail || getIdenticon(user.id, size);
}
