import axios from "axios";
import { CreatingTripRequest } from "../../../shared/types/trip/CreatingTripRequest";

const TRIP_API_URL = __DEV__ ? "http://localhost:3001" : "";

export default function useTripApi() {
  const createTrip = async (req: CreatingTripRequest) => {
    return await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${TRIP_API_URL}/trips`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(req),
    });
  };

  return { createTrip };
}
