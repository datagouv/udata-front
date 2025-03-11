import type { Harvest } from "./harvest";
import type { Owned } from "./owned";

export type Dataservice = Owned & {
  id: string;

  // Description
  title: string;
  acronym: string;
  slug: string;
  description: string;
  base_api_url: string | null;

  // Technical information
  format: "REST" | "WMS" | "WSL";
  machine_documentation_url: string | null;
  technical_documentation_url: string | null;
  business_documentation_url: string | null;

  rate_limiting: string;
  rate_limiting_url: string;
  
  availability: number | null;
  availability_url: string;

  access_type: 'open' | 'open_with_account' | 'restricted';
  authorization_request_url: string | null;

  private: boolean;

  // References
  license: string | null;
  tags: Array<string>;
  contact_point:  string | null;
  datasets: Array<{
      class: string;
      id: string;
      acronym: string;
      page: string;
      title: string;
      uri: string;
    }>;
  harvest: Harvest;

  // Extras
  extras: Record<string, any>;
  metrics: { discussions: number; followers: number; reuses: number; views: number; };

  // Dates
  created_at: string;
  metadata_modified_at: string;
  deleted_at: string | null;
  archived_at: string | null;

  // URLs
  self_api_url: string;
  self_web_url: string;
}
