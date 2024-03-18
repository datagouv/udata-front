import config from "../config";

/**
 *
 * @param {import("@etalab/data.gouv.fr-components").User} user
 * @param {number} size
 */
export default function useUserAvatar(user, size) {
  /**
   *
   * @param {string} id
   * @param {number} size
   */
  const getIdenticon = (id, size) => `${config.api_root}avatars/${id}/${size}`;
  return user.avatar_thumbnail || getIdenticon(user.id, size);
}
