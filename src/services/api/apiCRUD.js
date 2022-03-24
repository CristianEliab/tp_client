import http_api from "../axios/http_api";

export const getData = async ({ fileName }) => {
  return await http_api.get("data", { params: { fileName } });
};

export const getList = async () => {
  return await http_api.get("list");
};
