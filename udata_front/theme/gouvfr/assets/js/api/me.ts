import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import { auth } from "../plugins/auth";
import type { Me } from "../types";

let me: Promise<Me>;

export function fetchMe(): Promise<Me> {
  auth();
  if(me) {
    return me;
  }
  return me = api.get<Me>(getLocalizedUrl("me/")).then(resp => resp.data);
}

