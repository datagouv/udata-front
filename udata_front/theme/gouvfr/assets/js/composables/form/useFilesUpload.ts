import { onMounted, readonly, ref, toValue, MaybeRefOrGetter } from "vue";
import { useI18n } from "vue-i18n";
import { createFile, fetchAllowedExtensions } from '../../api/resources';
import type { DatasetFile, NewDatasetFile } from "../../types";

 const allowedExtensions = ref<Array<string>>([]);

 const promiseAllowedExtensions = ref<Promise<Array<string>> | null>(null);

export function useFilesUpload() {
  const { t } = useI18n();

  const files = ref<Array<NewDatasetFile>>([]);

  const updateFiles = (updatedFiles: MaybeRefOrGetter<Array<NewDatasetFile>>) => {
    const t = [...toValue(updatedFiles)];
    files.value = t;
  };

  const uploadFile = (datasetId: string, file: NewDatasetFile, retry = 0): Promise<NewDatasetFile | DatasetFile> => {
    if(retry > 3) {
      return Promise.reject(t("Failed to upload file " + file.title));
    }
    return createFile(datasetId, file).catch(_failed => {
      return uploadFile(datasetId, file, retry + 1);
    });
  }

  const uploadFiles = (datasetId: string) => {
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
    files: files,
    updateFiles,
    uploadFiles,
  }
}
