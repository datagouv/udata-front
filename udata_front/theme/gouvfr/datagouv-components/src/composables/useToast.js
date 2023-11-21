import { createToaster } from "@conciergerie.dev/vue-toaster";

const toast = createToaster({
  duration: false,
  dismissible: true,
});

export function useToast() {
  return { toast };
}
