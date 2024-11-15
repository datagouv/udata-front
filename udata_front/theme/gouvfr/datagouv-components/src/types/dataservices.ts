import type { Harvest } from "./harvest";
import type { Owned, OwnedWithId } from "./owned";

export type BaseDataservice = Owned & {
  acronym: string;
  authorization_request_url: string | null;
  availability: number | null;
  base_api_url: string | null;
  datasets: Array<{
      class: string;
      id: string;
      acronym: string;
      page: string;
      title: string;
      uri: string;
    }>;
  description: string;
  endpoint_description_url: string | null;
  business_documentation_url: string | null;
  has_token: boolean;
  is_restricted: boolean;
  license: string | null;
  private: boolean;
  rate_limiting: string;
  title: string;
  contact_point: string | null;
};

export type NewDataservice = Omit<BaseDataservice, keyof OwnedWithId> & OwnedWithId;

export type Dataservice = Owned & {
  acronym: string;
  archived_at: string | null;
  authorization_request_url: string | null;
  availability: number | null;
  base_api_url: string | null;
  contact_point:  string | null;
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
  endpoint_description_url: string | null;
  business_documentation_url: string | null;
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
