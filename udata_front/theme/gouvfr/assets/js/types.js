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
 * @typedef {Object} Quality
 * @property {boolean} all_resources_available
 * @property {boolean} dataset_description_quality
 * @property {boolean} has_open_format
 * @property {boolean} has_resources
 * @property {boolean} license
 * @property {boolean} resources_documentation
 * @property {number} score
 * @property {boolean} spatial
 * @property {boolean} temporal_coverage
 * @property {boolean} update_frequency
 * @property {boolean} update_fulfilled_in_time
 */

/**
 * @typedef {import("@nicolaskempf57/data.gouv.fr-components").Owned & {
 *  title: string,
 *  acronym: string,
 *  archived: boolean,
 *  description: string,
 *  tags: Array<string> | null,
 *  license: string,
 *  frequency: string,
 *  temporal_coverage: string,
 *  frequency_date: Date | null,
 *  page: string,
 *  private: boolean,
 *  quality?: Quality,
 *  spatial: {
 *    zones?: Array<string>,
 *    granularity?: string,
 *  } | null
 * }} NewDataset
 */

/**
 * @typedef {NewDataset & {
 *  id: string,
 *  page: string,
 *  resources: Array<import("@nicolaskempf57/data.gouv.fr-components").Resource>,
 *  community_resources: Array<import("@nicolaskempf57/data.gouv.fr-components").Resource>,
 *  created_at: string,
 *  last_modified: string,
 *  last_update: string,
 *  uri: string,
 *  slug: string,
 *  quality: Quality,
 *  metrics: {discussions: number, followers: number, reuses: number, views: number}
 * }} Dataset
 */

 /**
  * @typedef {"start" | "center" | "end"} AxisAlignment
  */

  export default {};
