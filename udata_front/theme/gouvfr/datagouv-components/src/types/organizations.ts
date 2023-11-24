/**
 * A resource, dataset, reuse or any other object owned by an organization or a user.
 */
export type Owned = {
  organization?: Organization;
  owner?: { first_name: string; last_name: string; };
}

export type Organization = {
  acronym: string | null,
  id: string;
  name: string,
  uri: string,
  slug: string,
  page: string,
  logo: string,
  logo_thumbnail: string,
  badges: Array<{kind: string}>
}
