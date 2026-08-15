import axios, { AxiosInstance } from "axios";
import config from "../config/config";
import { OSMSearchResponse } from "../shared/types/osm/OSMSearchResponse";

class OSMService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL =
      config.getEnv().openStreetMapURL ?? "https://nominatim.openstreetmap.org";
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  async search({
    q,
    format = "jsonv2",
  }: {
    q: string;
    format?: string;
  }): Promise<OSMSearchResponse[] | undefined> {
    return await this.instance
      .request({
        method: "get",
        maxBodyLength: Infinity,
        url: "/search",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          q,
          format,
        },
      })
      .then((res) => {
        return res.data as OSMSearchResponse[];
      })
      .catch((err) => {
        console.error("error during osm search", err);
        return undefined;
      });
  }
}

export default new OSMService();
