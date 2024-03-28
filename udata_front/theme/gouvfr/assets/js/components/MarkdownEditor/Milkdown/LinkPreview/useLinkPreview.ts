import { inject, readonly } from "vue";
import { type InjectionKey, type Ref, provide, ref } from "vue";

export function useLinkPreviewProvider() {
  const link = ref("");
  provide(linkPreviewLinkKey, link);
}

export function useLinkPreview() {
  const link = inject(linkPreviewLinkKey) as Ref<string>;

  return {
    link: readonly(link),
    updateLink(newLink: string) {
      link.value = newLink;
    },
  }
}

export const linkPreviewLinkKey = Symbol() as InjectionKey<Ref<string>>;
