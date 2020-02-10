import http from "./httpService";
import config from "../config.json";

const fileRoute = config["fileRoute"];
const maxFileSize = config["maxFileSize"];

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
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
}
