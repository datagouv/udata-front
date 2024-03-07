export type NewOrganization = {
  acronym: string | null,
  name: string,
  business_number_id: string;
  description: string;
  url: string,
}

export type Organization = NewOrganization & {
  id: string;
  created_at: string;
  last_modified: string;
  last_update: string;
  deleted: string | null;
  logo: string;
  logo_thumbnail: string;
  members: Array<any>
  metrics: { datasets: number; followers: number; members: number; reuses: number; views: number; };
  page: string;
  slug: string;
  uri: string;
  badges: Array<{kind: string}>
}
