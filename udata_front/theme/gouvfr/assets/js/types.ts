import type { Owned, Resource } from "@etalab/data.gouv.fr-components";

export type Subject = {
  id: string;
  class: string;
};

export type NewDiscussion = {
  title: string;
  comment: string;
  subject: Subject;
};

export type CreateDiscussion = (discussion: NewDiscussion) => Promise<any>

export type CreateComment = (comment: string) => Promise<any>

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
}

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

export type Dataset = NewDataset & {
id: string;
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
};

export type UiDataset = Omit<Dataset, 'last_modified'> & {
  last_modified: Date;
};

export type AxisAlignment = "start" | "center" | "end";

export default {};
