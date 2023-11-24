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
 * @callback CreateDiscussion
 * @param {NewDiscussion} discussion
 * @returns {Promise}
 */

/**
 * @callback CreateComment
 * @param {string} comment
 * @returns {Promise}
 */
 /**
  * @typedef {"start" | "center" | "end"} AxisAlignment
  */

  export default {};
