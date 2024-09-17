import type { AxiosResponse } from "axios";
import { api } from "./api";
import { Resource } from "../types/resources";
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
  name?: string | null;
  url ?: string | null;
  version ?: string | null;
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
  tags: Array<string>;
}
export type SchemaResponseData = Array<RegisteredSchema>;
export type SchemaResponse = AxiosResponse<SchemaResponseData>;

type SchemaPath = {'schema_name': string } | {"schema_url": string};

let catalogRequest: Promise<Array<RegisteredSchema>> | null = null;

/**
 * Get Schema Catalog
 */
export async function getCatalog(): Promise<SchemaResponseData> {
  if (catalogRequest) {
    return catalogRequest;
  }
  catalogRequest = api.get<SchemaResponseData>("datasets/schemas/")
    .then((resp) => resp.data)

  return catalogRequest;
}

export function findSchemaInCatalog(catalog: Array<RegisteredSchema>, schema: Schema): RegisteredSchema | null
{
  return catalog.find(registeredSchema => schema?.name === registeredSchema.name) || null;
}

export function getSchemaDocumentation(name: string): string
{
  return `${config.schema_documentation_url}${name}/`;
}

export function getSchemaValidationUrl(resource: Resource, registeredSchema: RegisteredSchema): string | null 
{
  if(!resource.schema || !resource.schema.name) {
    return null;
  }

  let schemaPath: SchemaPath = {'schema_name': `schema-datagouvfr.${resource.schema.name}`};
  if(resource.schema && resource.schema.version) {
    const schemaVersion = resource.schema.version;
    const versionUrl = registeredSchema.versions.find(version => version.version_name === schemaVersion)?.schema_url;
    if(versionUrl) {
      schemaPath = {"schema_url": versionUrl};
    }
  }
  const query = new URLSearchParams({
    'input': 'url',
    'url': resource.url,
    'header-case': 'on',
    ...schemaPath,
  }).toString();
  return `${config.schema_validata_url}/table-schema?${query}`;
}