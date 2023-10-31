 /**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} [slug]
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [avatar]
 * @property {string} [avatar_thumbnail]
 * @property {Array<string>} [roles]
 */

 /**
 * @typedef Subject
 * @property {string} id
 * @property {string} class
 */

/**
 * @typedef NewDiscussion
 * @property {string} title
 * @property {string} comment
 * @property {Subject} subject
 */

 /**
  * @typedef {"start" | "center" | "end"} AxisAlignment
  */

  export default {};
