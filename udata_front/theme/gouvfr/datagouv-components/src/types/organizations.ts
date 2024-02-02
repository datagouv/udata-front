export type Organization = {
  acronym: string | null,
  id: string;
  name: string,
  uri: string,
  slug: string,
  page: string,
  logo: string,
  logo_thumbnail: string,
  badges: Array<{kind: string}>
}
