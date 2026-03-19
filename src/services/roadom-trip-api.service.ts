import axios, { AxiosInstance } from "axios";
import config from "../config/config";

class RoadomTripApiService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = config.getEnv().roadomTripApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }
}

export default new RoadomTripApiService();
