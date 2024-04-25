import { createToaster } from "@datagouv/vue-toaster";

const toast = createToaster({
  duration: false,
  dismissible: true,
});

export default function useToast() {
  return { toast };
}
