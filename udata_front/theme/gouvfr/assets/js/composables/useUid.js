import { readonly } from "vue";

let uid = 0;
export default function useUid(prefix = 'id') {
    uid++;
    return readonly({
        id: `${prefix}-${uid}`,
    });
}
