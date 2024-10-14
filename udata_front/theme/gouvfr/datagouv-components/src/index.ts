import type { Badge, Badges } from "./types/badges";
import type { Dataset, DatasetV2, NewDataset, Quality, Rel } from "./types/datasets";
import type { NewDataservice, Dataservice } from "./types/dataservices";
import type { Frequency, Frequencies } from "./types/frequency";
import type { Granularity, Granularities } from "./types/granularity";
import type { Harvest } from "./types/harvest";
import type { License } from "./types/licenses";
import type { Member, MemberRole, NewOrganization, Organization } from "./types/organizations";
import type { Owned, OwnedWithId } from "./types/owned";
import type { NewReuse, Reuse, ReuseType } from "./types/reuses";
import type { CommunityResource, FileResourceFileType, RemoteResourceFileType, ResourceFileType, ResourceType, Resource } from "./types/resources";
import type { Weight, WellType } from "./types/ui";
import type { User } from "./types/users";
import { setupI18n, setupI18nWithExistingInstance } from './helpers/i18n';
import { getRandomId } from "@gouvminint/vue-dsfr";

export type {
  Badge,
  Badges,
  CommunityResource,
  Dataset,
  DatasetV2,
  Dataservice,
  NewDataservice,
  FileResourceFileType,
  Frequency,
  Frequencies,
  Granularity,
  Granularities,
  Harvest,
  License,
  Member,
  MemberRole,
  NewDataset,
  NewOrganization,
  NewReuse,
  Organization,
  Owned,
  OwnedWithId,
  Quality,
  Rel,
  RemoteResourceFileType,
  Resource,
  ResourceFileType,
  ResourceType,
  Reuse,
  ReuseType,
  User,
  Weight,
  WellType,
};

export * from "./api";
export * from "./components";
export * from "./composables";
export * from "./config";
export * from "./helpers";
export { getRandomId, setupI18n, setupI18nWithExistingInstance };
