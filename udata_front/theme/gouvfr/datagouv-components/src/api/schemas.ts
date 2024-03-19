import axios from "axios";
import type { AxiosResponse } from "axios";
import { config } from "../config";

/**
 * A schema version.
 */
export type SchemaVersion = {
  version_name: string;
  schema_url: string;
}

/**
 * A schema from the schema catalog
 */
export type RegisteredSchema = {
  name: string;
  schema_type: string;
  versions: Array<SchemaVersion>;
}

/**
 * A schema associated with a resource.
 */
export type Schema = {
  name?: string
  url ?: string
  version ?: string
} | null;

export interface ValidataError {
  code: string;
  description: string;
  fieldName: string;
  fieldNumber: number;
  fieldPosition: number;
  message: string;
  name: string;
  note: string;
  rowNumber: number;
  rowPosition: number;
}
export type SchemaResponseData = { schemas: Array<RegisteredSchema>; }
export type SchemaResponse = AxiosResponse<SchemaResponseData>;

let catalogRequest: Promise<Array<RegisteredSchema>> | null = null;

/**
 * Get Schema Catalog
 */
export function getCatalog() {
  if(!config.schema_catalog_url) {
    catalogRequest = Promise.resolve([]);
  }
  if (catalogRequest) {
    return catalogRequest;
  }
  catalogRequest = axios.get<SchemaResponseData>(config.schema_catalog_url)
  .then((resp) => resp.data)
  .then((data) => data.schemas);
  return catalogRequest;
}
