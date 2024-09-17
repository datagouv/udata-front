import type { Harvest } from "./harvest";
import type { Owned } from "./owned";

export type ContactPoint = {
  email: string;
  id: string;
  name: string;
  organization: string | null;
  owner: string | null;
} | null;

export type Dataservice = Owned & {
  acronym: string;
  archived_at: string | null;
  authorization_request_url: string;
  availability: number | null;
  base_api_url: string;
  contact_point: ContactPoint;
  created_at: string;
  datasets: Array<{
      class: string;
      id: string;
      acronym: string;
      page: string;
      title: string;
      uri: string;
    }>;
  deleted_at: string | null;
  description: string;
  endpoint_description_url: string;
  extras: Record<string, any>;
  format: string;
  harvest: Harvest;
  has_token: boolean;
  id: string;
  is_restricted: boolean;
  license: string | null;
  metadata_modified_at: string;
  metrics: { discussions: number; followers: number; reuses: number; views: number; };
  private: boolean;
  rate_limiting: string;
  self_api_url: string;
  self_web_url: string;
  slug: string;
  tags: Array<string>;
  title: string;
}
