import { api } from "@etalab/data.gouv.fr-components";
import type { Post } from "../types";

export async function getPost(id: string) {
  const res = await api.get<Post>(`posts/${id}/`);
  return res.data;
};
