import { extractPath } from "../util/functions";
import api from "./api";
import { useQuery } from "react-query";

type payload = {
  id: number | undefined;
  option: { storageType: string; sort: string; order: string };
};

// 디렉토리 호출 api
const getDirectoryList = async (payload: payload) => {
  const { data } = await api.get(
    `/api/directory/${payload?.id}/list?storageType=${payload?.option.storageType}`
  );
  return data;
};
export const useDirectories = (payload: payload) => {
  return useQuery({
    queryKey: ["directories", payload],
    queryFn: () => getDirectoryList(payload),
  });
};
// 파일리스트 호출
const getFileList = async (payload: payload) => {
  if (typeof payload.id === "number") {
    const { data } = await api.get(
      `/api/file/${payload?.id}/list?storageType=${payload?.option.storageType}&sort=${payload?.option.sort}&order=${payload?.option.order}`
    );
    return data;
  } else return null;
};
export const useFiles = (payload: payload) => {
  return useQuery({
    queryKey: ["files", payload],
    queryFn: () => getFileList(payload),
  });
};

export const uploadFiles = async (directoryId: number, file: File) => {
  try {
    const response = await api.post(
      `api/file/${directoryId}/upload`,
      extractPath(file),
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          // Handle progress if needed
          console.log(e);
        },
      }
    );

    if (response.status === 200) {
      return true; // Success
    } else {
      return false; // Failure
    }
  } catch (error) {
    console.error("Error uploading file", error);
    return false; // Failure
  }
};
