import api from "./api";

export const getTreeList = async (id: number | 0) => {
  const res = await api
    .get(`/api/directory/${id}/list`)
    .then((res) => {
      console.log("Response Data:", res.data);
      return res;
    })
    .catch((error) => {
      console.error("Request failed:", error);
      return null;
    });

  return res;
};
