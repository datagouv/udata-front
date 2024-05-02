import type { Badge, Badges } from "./types/badges";
import type { Dataset, DatasetV2, NewDataset, Quality, Rel } from "./types/datasets";
import type { License } from "./types/licenses";
import type { Organization } from "./types/organizations";
import type { Owned } from "./types/owned";
import type { Resource } from "./types/resources";
import type { User } from "./types/users";
import { setupI18n, setupI18nWithExistingInstance } from './helpers/i18n';
import { getRandomId } from "@gouvminint/vue-dsfr";

export type { Badge, Badges, Dataset, DatasetV2, License, NewDataset, Quality, Rel, Organization, Owned, Resource, User };
export * from "./api";
export * from "./components";
export * from "./composables";
export * from "./config";
export * from "./helpers";
export { getRandomId, setupI18n, setupI18nWithExistingInstance };
