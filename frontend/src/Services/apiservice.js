import axios from "axios";

class AxiosService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:3005/api/v1",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get(url, options) {
    return this.apiClient.get(url, options);
  }

  post(url, body, options) {
    return this.apiClient.post(url, body, options);
  }

  patch(url, body, options) {
    //may return the response directly here
    //also handle error from here

    return this.apiClient.patch(url, body, options);
  }

  put(url, body, options) {
    return this.apiClient.put(url, body, options);
  }

  remove(url, options) {
    return this.apiClient.delete(url, options);
  }
}
const apiService = new AxiosService();
export default apiService;
