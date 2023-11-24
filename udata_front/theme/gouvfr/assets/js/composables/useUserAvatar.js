import config from "../config";

/**
 *
 * @param {import("@nicolaskempf57/data.gouv.fr-components").User} user
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
