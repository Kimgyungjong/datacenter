import api from "./api";

export const getDirectoryList = async (id: number | 0) => {
  const type = "S3";
  return await api.get(`/api/directory/${id}/list?storageType=${type}`);
};
export const getFileList = async (directoryId: number | 0) => {
  const payload = {
    storageType: "S3",
    sort: "NAME",
    order: "ASC",
  };
  return await api.get(
    `/api/file/${directoryId}/list?storageType=${payload.storageType}&sort=${payload.sort}&order=${payload.order}`
  );
};
