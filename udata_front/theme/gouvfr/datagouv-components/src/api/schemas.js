import axios from "axios";
import { schema_catalog_url } from "../config";

/**
 * A schema version.
 * @typedef SchemaVersion
 * @type {object}
 *  @property {string} version_name - The version name, ex: 1.0.0
 *  @property {string} schema_url - The version url
 */

/**
 * A schema from the schema catalog
 * @typedef RegisteredSchema
 * @property {string} name - The schema name.
 * @property {string} schema_type - The schema type.
 * @property {Array<SchemaVersion>} versions - The schema versions.
 */

/**
 * @typedef UnknownSchema
 * @property {string} url - The schema name.
 */

/**
 * @typedef SelectedSchema
 * @property {string} name - The schema name.
 * @property {string} [version] - The schema version.
 */

/**
 * A schema associated with a resource.
 * @typedef Schema
 * @type {SelectedSchema | UnknownSchema | {}}
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

/**
 * @typedef {import("axios").AxiosResponse<{schemas: Array<RegisteredSchema>}>} SchemaResponse
 */

/** @type {Promise<Array<RegisteredSchema>> | null} */
let catalogRequest = null;

/**
 * Get Schema Catalog
 * @returns {Promise<Array<RegisteredSchema>>}
 */
export default function getCatalog() {
  if(!schema_catalog_url) {
    catalogRequest = Promise.resolve([]);
  }
  if (catalogRequest) {
    return catalogRequest;
  }
  catalogRequest = /** @type {Promise<SchemaResponse>} */(axios.get(schema_catalog_url))
  .then((resp) => resp.data)
  .then((data) => data.schemas);
  return catalogRequest;
}
