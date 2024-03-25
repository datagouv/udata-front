export type User = {
  id: string;
  slug?: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  page: string;
  avatar_thumbnail?: string | null;
  roles?: Array<string>;
}
