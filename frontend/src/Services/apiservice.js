import axios from "axios";

let baseURL = "";

if (NODE_ENV == "production") {
  port = 80;
}

if (NODE_ENV == "development") {
  port = 3005;
}

class AxiosService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: `http://localhost:${port}/api/v1`,
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
