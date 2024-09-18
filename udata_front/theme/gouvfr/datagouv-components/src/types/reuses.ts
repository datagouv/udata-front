import type { Owned } from "./owned";
import type { Dataset } from "./datasets";
import { Badges } from "./badges";

export type Reuse = Owned & {
  badges: Badges;
  created_at: string;
  datasets: Array<Dataset>;
  archived: string | null;
  deleted: string | null;
  description: string;
  extras: Record<string, any>;
  featured: boolean;
  id: string;
  image: string | null;
  image_thumbnail: string | null;
  last_modified: string;
  metrics: {
    datasets: number;
    discussions: number;
    followers: number;
    views: number;
  };
  title: string;
  private: boolean;
  slug: string;
  tags: Array<string> | null;
  page: string;
  topic: string;
  type: string;
  uri: string;
  url: string;
};
