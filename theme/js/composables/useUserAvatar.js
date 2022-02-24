import config from "../config";

export default function useUserAvatar(user) {
  const getIdenticon = () => `${config.api_root}avatars/${id}/${size}`;
  return user.avatar || getIdenticon(user.id);
}
