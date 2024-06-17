import { MaybeRefOrGetter, ref, toValue, unref } from "vue";
import { config } from "../../config";
import { type SortConfig, getData } from "../../api/tabularApi";
import type { Resource } from "../../types/resources";

export default function getDataTabularApi(resource: MaybeRefOrGetter<Resource>) {
  resource = unref(resource);
  const rows = ref<Array<Record<string, any>>>([]);
  const columns = ref<Array<string>>([]);
  const loading = ref(true);
  const hasError = ref(false);
  const sortConfig = ref<SortConfig>(null);
  const rowCount = ref(0);
  const pageSize = config.tabular_page_size;
  const currentPage = ref(1);


  /**
   * Check if the preview is sorted by the provided column
   */
  const isSortedBy = (col: string) => col === sortConfig.value?.column;


  /**
   * Retrieve preview necessary infos
   */
  const getTableInfos = async (page: number, sortConfig?: SortConfig) => {
    try {
      // Check that this function return wanted data
      const { data } = await getData(toValue(resource).id, page, sortConfig);
      if ('data' in data && data.data && data.data.length > 0) {
        // Update existing rows
        rows.value = data.data;
        columns.value = Object.keys(data.data[0]).filter(item => item !== "__id");
        rowCount.value = data.meta.total;
        currentPage.value = page;
        loading.value = false
      } else {
        hasError.value = true;
        loading.value = false;
      }
    } catch (error) {
      hasError.value = true;
      loading.value = false;
    }
  };


  /**
   * Change page
   */
  const changePage = (page: number) => {
    getTableInfos(page, sortConfig.value);
  }


  /**
   * Sort by a specific column
   */
  const sortByField = (col: string) => {
    if (sortConfig.value && sortConfig.value.column == col) {
      if (sortConfig.value.type == "asc") {
        sortConfig.value.type = "desc";
      } else {
        sortConfig.value.type = "asc";
      }
    } else {
      if (!sortConfig.value) {
        sortConfig.value = {
          column: col,
          type: "asc",
        };
      } else {
        sortConfig.value.column = col;
        sortConfig.value.type = "asc";
      }
    }
    currentPage.value = 1;
    getTableInfos(currentPage.value, sortConfig.value);
  };

  return {
    loading,
    hasError,
    rows,
    columns,
    rowCount,
    pageSize,
    currentPage,
    sortConfig,
    isSortedBy,
    sortByField,
    changePage,
    getTableInfos,
  }
}
