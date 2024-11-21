import { onMounted, ref, type Ref } from "vue";
import { getLocalizedUrl } from "../i18n";
import { api } from "../plugins/api";
import { auth } from "../plugins/auth";
import type { Me } from "../types";

let innerMe = ref<Me | null>(null);
let me: Promise<Me>;

export function fetchMe(): Promise<Me> {
  auth();
  if(me) {
    return me;
  }
  return me = api.get<Me>(getLocalizedUrl("me/")).then(resp => resp.data);
}

export function useMe(): Ref<Me | null> {
  onMounted(async () => {
    innerMe.value = await fetchMe();
  })

  return innerMe;
}