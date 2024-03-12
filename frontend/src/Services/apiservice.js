import axios from "axios";

let baseURL = "";

if ((REACT_APP_NODE_ENV = production)) {
  baseURL = "http://server:3005/api/v1";
}

if ((REACT_APP_NODE_ENV = development)) {
  baseURL = "http://localhost:3005/api/v1";
}

class AxiosService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: baseURL,
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
