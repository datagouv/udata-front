import { api } from "@datagouv/components/ts";
import type { Post } from "../types";

export async function getPost(id: string) {
  const res = await api.get<Post>(`posts/${id}/`);
  return res.data;
};
