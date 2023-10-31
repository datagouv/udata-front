import config from "../config";

/**
 *
 * @param {import("../types").User} user
 * @param {number} size
 */
export default function useUserAvatar(user, size) {
  /**
   *
   * @param {string} id
   * @param {number} size
   */
  const getIdenticon = (id, size) => `${config.api_root}avatars/${id}/${size}`;
  return user.avatar || getIdenticon(user.id, size);
}
