import http from "./httpService";
import config from "../config.json";

const fileRoute = config["fileRoute"];
const maxFileSize = config["maxFileSize"];
const iosFileRoute = config["iosFileRoute"];

export function getFileDownloadURL(userId, modelId) {
  return `${fileRoute}/${userId}/${modelId}`;
}

export function getIOSFileDownloadURL(userId, modelId) {
  return `${iosFileRoute}/${userId}/${modelId}`;
}

export async function uploadModelFile(userId, modelId, file) {
  //Checking if max file size exceeds
  if (file.size >= maxFileSize)
    throw new Error(`Max file size of ${maxFileSize} Bytes exceeded!`);

  //Creating form with file data
  var formData = new FormData();
  formData.append("file", file);

  let response = await http.post(
    `${fileRoute}/${userId}/${modelId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function uploadModelIOSFile(userId, modelId, file) {
  //Checking if max file size exceeds
  if (file.size >= maxFileSize)
    throw new Error(`Max file size of ${maxFileSize} Bytes exceeded!`);

  //Creating form with file data
  var formData = new FormData();
  formData.append("file", file);

  let response = await http.post(
    `${iosFileRoute}/${userId}/${modelId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function downloadModelFile(userId, modelId) {
  http
    .get(`${fileRoute}/${userId}/${modelId}`, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${modelId}.smdl`);
      document.body.appendChild(link);
      link.click();
    });
}

export async function downloadModelIOSFile(userId, modelId) {
  http
    .get(`${iosFileRoute}/${userId}/${modelId}`, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${modelId}.ismdl`);
      document.body.appendChild(link);
      link.click();
    });
}
