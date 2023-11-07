import { onMounted, readonly, ref, toRaw, toValue } from "vue";
import { useI18n } from "vue-i18n";
import { createFile, fetchAllowedExtensions } from '../../api/resources';

 /** @type {import("vue").Ref<Array<string>>} */
 const allowedExtensions = ref([]);

 /** @type {import("vue").Ref<Promise | null>} */
 const promiseAllowedExtensions = ref(null);

export function useFilesUpload() {
  const { t } = useI18n();

  /** @type {import("vue").Ref<Array<import("../../types").NewDatasetFile>>} */
  const files = ref([]);

  /**
   *
   * @param {import("vue").MaybeRefOrGetter<Array<import("../../types").NewDatasetFile>>} updatedFiles
   */
  const updateFiles = (updatedFiles) => {
    files.value = [...toValue(toRaw(updatedFiles))];
  };

  /**
   *
   * @param {string} datasetId
   * @param {import("../../types").NewDatasetFile} file
   * @param {number} retry
   * @returns {Promise}
   */
  const uploadFile = (datasetId, file, retry = 0) => {
    if(retry > 3) {
      return Promise.reject(t("Failed to upload file " + file.title));
    }
    return createFile(datasetId, file).catch(failed => {
      return uploadFile(datasetId, file, retry + 1);
    });
  }

  /**
   *
   * @param {string} datasetId
   * @returns {Promise<Array<PromiseSettledResult<any>>>}
   */
  const uploadFiles = (datasetId) => {
    const promises = [];
    for(const i in files.value) {
      const file = files.value[i];
      if(file.state === "loaded") {
        continue;
      }
      files.value[i].state = "loading";
      let promise = uploadFile(datasetId, file).then(created => {
        files.value[i].state = "loaded";
        return created;
      }).catch(failed => {
        files.value[i].state = "failed";
        return Promise.reject(failed);
      });
      promises.push(promise);
    }
    return Promise.allSettled(promises);
  }

  onMounted(() => {
    if(!promiseAllowedExtensions.value) {
      promiseAllowedExtensions.value = fetchAllowedExtensions();
      promiseAllowedExtensions.value.then(extensions => allowedExtensions.value = extensions);
    }
  });

  return {
    allowedExtensions: readonly(allowedExtensions),
    files: readonly(files),
    updateFiles,
    uploadFiles,
  }
}
