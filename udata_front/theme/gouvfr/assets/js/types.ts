import type { Dataservice, Dataset, FileResourceFileType, Organization, Owned, RemoteResourceFileType, ResourceType, Reuse, User } from "@datagouv/components/ts";

import { CLOSED_FORMATS } from "./helpers";

export type MultiSelectOption = {
  label: string;
  value: string;
  image?: string;
  hidden?: boolean;
  selected?: boolean;
}

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

export type AdminBadgeState = DSFRFormDefaultState | FormFunctionalState | DSFRInfoState;

export type ClosedFormats = typeof CLOSED_FORMATS[number];

export type DatasetRemoteFile = { description?: string; filetype: RemoteResourceFileType; format: string; mime: string; schema?: string; title: string; type: ResourceType; url: string; };

export type DatasetLocalFile = { file: File; sha256?: string; description?: string; format: string; filesize: number; filetype: FileResourceFileType; mime: string; schema?: string; title: string; type: ResourceType; };

export type FileLoadingState = "none" | "loading" | "failed" | "loaded";

export type NewDatasetFile = (DatasetLocalFile | DatasetRemoteFile) & { state: FileLoadingState; };

export type DatasetFile = (DatasetLocalFile | DatasetRemoteFile) & { id: string; };

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

export type CreateDiscussion = (discussion: NewDiscussion) => Promise<any>;

export type CreateComment = (comment: string) => Promise<any>;

export type Spam = {
  status?: string;
}

export type Comment = {content: string, posted_by: User, posted_on: string, spam?: Spam};

export type Discussion = Array<Comment>;

export type DiscussionSubjectTypes = Dataservice | Dataset | Reuse | Post;

export type DiscussionSubject = {
  class: 'Dataservice' | 'Dataset' | 'Reuse' | 'Post' | 'Topic' | 'Organization';
  id: string;
};

export type Thread = {
  id: string;
  discussion: Discussion;
  title: string;
  url: string;
  created: string;
  closed: string;
  closed_by: User;
  spam?: Spam;
  subject: DiscussionSubject;
};

export type Sort = {
  name: string,
  key: string
}

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

export type SortDirection = 'asc' | 'desc';

export type DatasetSortedBy = 'title' | 'created' | 'last_update' | 'reuses' | 'followers' | 'views';

export type DataserviceSortedBy = 'title'

export type ReuseSortedBy = 'title' | 'created' | 'datasets' | 'followers' | 'views';

export type DiscussionSortedBy = 'title' | 'created' | 'closed';

export type CommunityResourceSortedBy = 'created_at_internal' | 'last_modified_internal' | 'title';

export type SpatialZone = {
  code: string;
  id: string;
  level: string;
  name: string;
  uri: string;
};

export type SpatialGranularity = {
  id: string;
  name: string;
};
export type MembershipStatus = "pending" | "accepted" | "refused";

export type PendingMembershipRequest = {
  id: string;
  user: User & {email: string;};
  status: MembershipStatus;
  created: string;
  comment: string;
};

export type MembershipRequest = PendingMembershipRequest & {
  handled_on: Date;
  handled_by: User;
};

export type RefusedMembershipRequest = MembershipRequest & {
  refusal_comment: string;
};

export type MemberRole = "admin" | "editor";

// In org end we get these two private information if we have edit rights on the org.
export type MemberUser = User & {
  email: string | null;
  last_login_at: string | null;
}

export type Member = {
  role: MemberRole;
  user: MemberUser;
  since: string;
};

export type EditingMember = Member & {
  newRole?: MemberRole;
};

export type Post = {
  body_type: 'markdown' | 'html';
  content: string;
  created_at: string;
  credit_to: string;
  credit_url: string;
  datasets: Array<Pick<Dataset, "acronym" | "id" | "page" | "title" | "uri">>;
  headline: string;
  id: string;
  image: string | null;
  last_modified: string;
  name: string;
  owner: User;
  page: string;
  published: string;
  reuses: Array<Pick<Reuse, "id" | "image" | "image_thumbnail" | "page" | "title" | "uri">>;
  slug: string;
  tags: Array<string>;
  url: string;
};

export type HarvesterValidation = {
  state: string;
  by: User;
  on: string;
  comment: string;
};

export type HarvestError = {
  created_at: string;
  message: string;
  details: string | null;
};

export type HarvestLog = {
  level: string;
  message: string;
};

export type HarvestItem = {
  remote_id: string;
  dataset: Dataset | null;
  dataservice: Dataservice | null;
  status: string;
  created: string;
  started: string | null;
  ended: string | null;
  errors: Array<HarvestError>;
  logs: Array<HarvestLog>;
  args: string;
  kwargs: Record<string, any>;
};

export type HarvesterJobStatus = "pending" | "initializing" | "initialized" | "processing" | "done" | "done-errors" | "failed";

export type HarvesterJob = {
  id: string;
  created: string;
  started: string | null;
  ended: string | null;
  status: HarvesterJobStatus;
  errors: Array<HarvestError>;
  items: Array<HarvestItem>;
  source: string;
};

export type HarvesterSource = Owned & {
  id: string;
  name: string;
  description: string | null;
  url: string;
  backend: string;
  config: Record<string, any>;
  created_at: string;
  active: boolean;
  autoarchive: boolean;
  validation: HarvesterValidation;
  last_job: HarvesterJob | null;
  deleted: string | null;
  schedule: string;
}

export type ContactPoint = {
  id: string;
  name: string;
  contact_form?: string;
  email?: string;
}


export default {};
