import type { Badges } from "./badges";
import type { Owned } from "./owned";
import type { Resource } from "./resources";

export type Quality = {
  all_resources_available: boolean;
  dataset_description_quality: boolean;
  has_open_format: boolean;
  has_resources: boolean;
  license: boolean;
  resources_documentation: boolean;
  score: number;
  spatial: boolean;
  temporal_coverage: boolean;
  update_frequency: boolean;
  update_fulfilled_in_time: boolean;
};

export type NewDataset = Owned & {
  title: string;
  acronym: string;
  archived: boolean;
  description: string;
  tags: Array<string> | null;
  license: string;
  frequency: string;
  temporal_coverage: string;
  frequency_date: Date | null;
  page: string;
  private: boolean;
  quality?: Quality;
  spatial: {
    zones?: Array<string>;
    granularity?: string;
  } | null;
};

export type Rel = {
  rel: string;
  href: string;
  total: number;
  type: string;
};

export type Dataset = NewDataset & {
  id: string;
  badges: Badges;
  page: string;
  resources: Array<Resource>;
  community_resources: Array<Resource>;
  created_at: string;
  last_modified: string;
  last_update: string;
  uri: string;
  slug: string;
  quality: Quality;
  metrics: { discussions: number; followers: number; reuses: number; views: number; };
  harvest: Record<string, any>
  extras: Record<string, any>
};

export type DatasetV2 = NewDataset & Omit<Dataset, 'resources' | 'community_resources'> & {
  resources: Rel;
  community_resources: Rel;
};
