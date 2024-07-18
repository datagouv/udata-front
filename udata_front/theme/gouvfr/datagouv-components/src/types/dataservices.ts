import type { Owned } from "./owned";

export type Dataservice = Owned & {
  acronym: string;
  archived_at: string | null ;
  authorization_request_url: string;
  availability: number;
  base_api_url: string;
  contact_point: {
    email: string;
    id: string;
    name: string;
    organization: string | null;
    owner: string | null;
  };
  created_at: string;
  datasets: [
    {
      class: string;
      id: string;
      acronym: string;
      page: string;
      title: string;
      uri: string;
    }
  ];
  deleted_at: string | null;
  description: string;
  endpoint_description_url: string;
  extras: Record<string, any>;
  format: string;
  harvest: Record<string, any>;
  has_token: boolean;
  id: string;
  is_restricted: boolean;
  license: string;
  metadata_modified_at: string;
  metrics: { discussions: number; followers: number; reuses: number; views: number; };
  private: boolean;
  rate_limiting: string;
  self_api_url: string;
  self_web_url: string;
  slug: string;
  tags: Array<string> | null;
  title: string;
}
