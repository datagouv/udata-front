import type { Organization, Owned, Resource, User } from "@etalab/data.gouv.fr-components";

export type MultiSelectOption = {
  label: string;
  value: string;
  image?: string;
  hidden?: boolean;
  selected?: boolean;
}

export type WellType = "primary" | "secondary";

export type Weight = "light" | "regular" | "semi-bold" | "bold" | "heavy";

export type AlertSize = "sm" | "md";

export type AlertType = FormFunctionalState | DSFRInfoState;

export type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type DSFRFormDefaultState = "default";

export type DSFRFormFunctionalState = "error" | "success";

export type DSFRFormState = DSFRFormDefaultState | DSFRFormFunctionalState;

export type FormFunctionalState = DSFRFormFunctionalState | "warning";

export type AccordionFunctionalState = FormFunctionalState | "disabled";

export type DSFRInfoState = "info";

export type PublishingFormAccordionState = AccordionFunctionalState | DSFRInfoState;

export type AccordionState = DSFRFormDefaultState | AccordionFunctionalState | DSFRInfoState;

export type ResourceType = typeof import("./helpers").RESOURCE_TYPE[number];

export type RemoteResourceFileType = "remote";

export type FileResourceFileType = "file";

export type ResourceFileType = RemoteResourceFileType | FileResourceFileType;

export type ClosedFormats = typeof import("./helpers").CLOSED_FORMATS[number];

export type DatasetRemoteFile = { description?: string; filetype: RemoteResourceFileType; format: string; mime: string; schema?: string; title: string; type: ResourceType; url: string; };

export type DatasetLocalFile = { file: File; sha256?: string; description?: string; format: string; filesize: number; filetype: FileResourceFileType; mime: string; schema?: string; title: string; type: ResourceType; };

export type FileLoadingState = "none" | "loading" | "failed" | "loaded";

export type NewDatasetFile = (DatasetLocalFile | DatasetRemoteFile) & { state: FileLoadingState; };

export type DatasetFile = (DatasetLocalFile | DatasetRemoteFile) & { rid: string; };

export type DatasetFullFileUpload = { file: Blob; uuid: string; filename: string; };

export type DatasetChunkUpload = DatasetFullFileUpload & { partindex: number; partbyteoffset: number; totalparts: number; chunksize: number; };

export type DatasetCombineChunkUpload = { uuid: string; filename: string; totalparts: number; };

export type DatasetChunkResponse = { "error": string | null; "message": string; "success": boolean; };

export type DatasetFileUpload = DatasetFullFileUpload | DatasetChunkUpload;

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

export type Harvest = {
  backend: string;
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
harvest: Harvest | null;
};

export type Reuse = Owned & {
  id: string;
  title: string;
  description: string;
  tags: Array<string> | null;
  page: string;
  private: boolean;
  deleted: boolean;
  datasets: Array<Dataset>;
  image: string;
  image_thumbnail: string;
  slug: string;
  topic: string;
  type: string;
  last_update: string;
};

export type Me = User & {
  about: string,
  active: boolean,
  apikey: string | null,
  metrics: {
    datasets: number,
    followers: number,
    following: number,
    reuses: number,
  },
  organizations: Array<Organization>,
  since: string,
  website: string,
}

export type AxisAlignment = "start" | "center" | "end";

export default {};
