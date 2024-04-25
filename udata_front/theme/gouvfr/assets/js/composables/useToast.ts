import { createToaster } from "@datagouv/vue-toaster";

const toast = createToaster({
  duration: false,
  dismissible: true,
});

export function useToast() {
  return { toast };
}
