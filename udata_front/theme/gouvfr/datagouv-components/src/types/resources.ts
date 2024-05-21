import type { Schema } from "../api/schemas";
import type { Owned } from "./owned";

export type ResourceRest = Owned & {
  id: string;
  title: string;
  type: string;
  checksum: { type: string; value: string; } | null;
  created_at: string;
  description: string | null;
  extras: Record<string, any>;
  metrics: { views: number; };
  harvest: object | null;
  filesize: number;
  filetype: string;
  format: string;
  mime: string;
  internal: object;
  last_modified: string;
  latest: string;
  preview_url: string;
  schema: Schema;
  url: string;
};
