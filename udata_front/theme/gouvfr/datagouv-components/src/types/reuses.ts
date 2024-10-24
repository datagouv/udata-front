import type { Owned, OwnedWithId } from "./owned";
import type { Dataset } from "./datasets";
import { Badges } from "./badges";

export type BaseReuse = Owned & {
  title: string;
  description: string;
  tags: Array<string> | null;
  datasets: Array<Dataset | string>;
  topic: string;
  type: string;
  url: string;
  private: boolean;
};

export type NewReuse = Omit<BaseReuse, keyof OwnedWithId> & OwnedWithId;

export type Reuse = BaseReuse & {
  badges: Badges;
  created_at: string;
  datasets: Array<Dataset>;
  archived: string | null;
  deleted: string | null;
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
  slug: string;
  page: string;
  uri: string;
};

export type ReuseType = {
  id: string,
  label: string,
};
