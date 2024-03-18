import type { AxiosResponse } from "axios";
import { api } from "./api";
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
export type SchemaResponseData = Array<RegisteredSchema>;
export type SchemaResponse = AxiosResponse<SchemaResponseData>;

let catalogRequest: Promise<Array<RegisteredSchema>> | null = null;

/**
 * Get Schema Catalog
 */
export function getCatalog() {
  if (catalogRequest) {
    return catalogRequest;
  }
  catalogRequest = api.get<SchemaResponseData>("datasets/schemas/")
  .then((resp) => resp.data)
  return catalogRequest;
}
