import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import { auth } from "../plugins/auth";
import type { Me } from "../types";

export function fetchMe(): Promise<Me> {
  auth();
  return api.get<Me>(getLocalizedUrl("me/")).then(resp => resp.data);
}

