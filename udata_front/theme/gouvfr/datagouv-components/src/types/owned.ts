import { Organization } from "./organizations";
import { User } from "./users";

/**
 * A resource, dataset, reuse or any other object owned by an organization or a user.
 */
export type Owned = { organization: Organization, owner: never | null } | { organization: never | null, owner: User };
