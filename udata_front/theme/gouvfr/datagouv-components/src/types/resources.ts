import type { Schema } from "../api/schemas";
import { RESOURCE_TYPE } from "../helpers";
import { Harvest } from "./harvest";
import { Owned } from "./owned";

export type ResourceType = typeof RESOURCE_TYPE[number];

export type RemoteResourceFileType = "remote";

export type FileResourceFileType = "file";

export type ResourceFileType = RemoteResourceFileType | FileResourceFileType;

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  checksum: { type: string; value: string; } | null;
  created_at: string;
  description: string | null;
  extras: Record<string, any>;
  metrics: { views: number; };
  harvest: Harvest;
  filesize: number | null;
  filetype: ResourceFileType;
  format: string;
  mime: string;
  internal: Record<string, any>;
  last_modified: string;
  latest: string;
  preview_url: string;
  schema: Schema;
  url: string;
};

export type CommunityResource = Owned & Resource;
