import { config } from "../config";
import { User } from "../types/users";

export default function useUserAvatar(user: User, size: number) {
  const getIdenticon = (id: string, size: number) => `${config.api_root}avatars/${id}/${size}`;
  console.log(user.avatar_thumbnail || getIdenticon(user.id, size))
  return user.avatar_thumbnail || getIdenticon(user.id, size);
}
