export type User = {
  id: string;
  slug?: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  avatar_thumbnail?: string;
  roles?: Array<string>;
}
