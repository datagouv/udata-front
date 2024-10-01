import type { User } from "..";
import type { Badges } from "./badges";

export type MemberRole = "admin" | "editor";

export type Member = {
  role: MemberRole;
  user: User;
};

export type NewOrganization = {
  acronym: string | null;
  name: string;
  business_number_id: string | null;
  description: string;
  url: string | null;
  logo: string;
};

export type Organization = NewOrganization & {
  id: string;
  created_at: string;
  last_modified: string;
  last_update: string;
  deleted: string | null;
  extras: Record<string, any>;
  logo_thumbnail: string;
  members: Array<Member>;
  metrics: { datasets: number; followers: number; members: number; reuses: number; views: number; };
  page: string;
  slug: string;
  uri: string;
  badges: Badges;
};
