import { MaybeRefOrGetter, ref, toValue, watchEffect } from "vue";
import { getProfile } from "../../api/tabularApi";
import type { Resource } from "../../types/resources";

export type ColumnInfo = {
  score: number;
  format: string;
  python_type: string;
};

export default function useProfileTabularApi(resource: MaybeRefOrGetter<Resource>) {
  const columns = ref<Array<string>>([]);
  const columnsInfo = ref<Record<string, ColumnInfo>>({})
  const loading = ref(true);
  const hasError = ref(false);
  const hasColumnInfo = ref(false);

  /**
   * Retrieve profile from a resource
   */
  const getProfileInfos = async () => {
    try {
      const { data } = await getProfile(toValue(resource).id); // Assurez-vous que cette fonction retourne bien les données attendues
      if ('profile' in data && data.profile) {
        columns.value = Object.keys(data.profile.columns);
        columnsInfo.value = data.profile.columns;
        hasColumnInfo.value = true;
        loading.value = false;
      } else {
        hasError.value = true;
        loading.value = false;
      }
    } catch (error) {
      hasError.value = true;
      loading.value = false;
    }
  };

  watchEffect(() => {
    getProfileInfos();
  });

  return {
    loading,
    hasError,
    hasColumnInfo,
    columns,
    columnsInfo,
  };
}
