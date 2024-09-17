import type { Owned } from "./owned";
import type { Dataset } from "./datasets";

export type Reuse = Owned & {
  id: string;
  title: string;
  description: string;
  archived: boolean | null;
  tags: Array<string> | null;
  page: string;
  private: boolean;
  deleted: boolean;
  datasets: Array<Dataset>;
  image: string;
  image_thumbnail: string;
  slug: string;
  topic: string;
  type: string;
  url: string;
  created_at: string,
  last_update: string;
  metrics: {
    datasets: number,
    discussions: number,
    followers: number,
    views: number,
  }
};
