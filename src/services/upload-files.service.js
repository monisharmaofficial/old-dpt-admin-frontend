import axios from "axios";
import config from '../config'
const API_URL = `${config.baseUrl}`;

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(`${API_URL}/files`);
  }
}

export default new UploadFilesService();
