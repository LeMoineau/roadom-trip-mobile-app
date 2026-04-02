import axios, { AxiosInstance } from "axios";
import { CreatingTripRequest } from "../shared/types/dto/trip/CreatingTripRequest";
import { TripDto } from "../shared/types/dto/trip/Trip.dto";

class RoadomTripApiService {
  baseURL: string;
  instance: AxiosInstance;

  constructor() {
    this.baseURL = "http://10.220.238.167:3001"; // config.getEnv().roadomTripApiURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "User-Agent": "roadom-trip-api/1.0 (ctop.x2@gmail.com)",
      },
    });
  }

  async createTrip(req: CreatingTripRequest): Promise<TripDto | undefined> {
    return this.instance
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: "/trips",
        headers: {
          "Content-Type": "application/json",
        },
        data: { ...req },
      })
      .then((res) => {
        console.log("created trip", res.data);
        if (!!!res.data) {
          console.error(`error getting trip creation response`, req, res);
          return undefined;
        }
        return res.data;
      });
  }
}

export default new RoadomTripApiService();
