import config from "../config";
import { api } from "../plugins/api";

/**
 * A schema version.
 * @typedef SchemaVersion
 * @type {object}
 *  @property {string} version_name - The version name, ex: 1.0.0
 *  @property {string} schema_url - The version url
 */

/**
 * A json schema associated with a resource.
 * @typedef Schema
 * @type {object}
 * @property {string} id - The schema name.
 * @property {string} label - The schema label for humans.
 * @property {Array<string>} versions - The schema versions.
 */

/**
 * A Validata error
 * @typedef ValidataError
 * @type {Object}
 * @property {string} code - The error code
 * @property {string} description - The error description in English
 * @property {string} fieldName - The name of the associated schema field
 * @property {number} fieldNumber - The number of the associated schema field
 * @property {number} fieldPosition - The position of the associated schema field
 * @property {string} message - A message in French explaining the error
 * @property {string} name - The error name in French
 * @property {string} note - Additional details regarding the description in English or French
 * @property {number} rowNumber - Affected row number
 * @property {number} rowPosition - Affected row position in file
 */

let catalog = null;
let catalogRequest = null;

/**
 * Get Schema Catalog
 * @returns {Promise<Array<Schema>>}
 */
export default function getCatalog() {
  if(!config.schema_catalog_url) {
    catalogRequest = Promise.resolve([]);
  }
  if (catalogRequest) {
    return catalogRequest;
  }
  catalogRequest = api.get("datasets/schemas/")
  .then((resp) => resp.data)
  .then((data) => {
    catalog = data;
    return catalog;
  })
  return catalogRequest;
}
