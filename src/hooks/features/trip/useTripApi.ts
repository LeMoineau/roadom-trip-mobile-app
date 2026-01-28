import axios, { AxiosError } from "axios";
import { Trip } from "../../../shared/models/Trip.model";
import { CreatingTripRequest } from "../../../shared/types/dto/trip/CreatingTripRequest";
import { TripDto } from "../../../shared/types/dto/trip/Trip.dto";

//10.172.9.167
//localhost
const TRIP_API_URL = __DEV__ ? "http://localhost:3001" : "";

export default function useTripApi() {
  const createTrip = async (req: CreatingTripRequest): Promise<Trip> => {
    console.log(TRIP_API_URL);
    return await axios
      .request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${TRIP_API_URL}/trips`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(req),
      })
      .then((res) => {
        console.log(res.data);
        return new Trip(res.data as TripDto);
      })
      .catch((err: AxiosError) => {
        throw new Error(
          err.response?.data !== undefined ? `${err.response?.data}` : err.code,
        );
      });
  };

  return { createTrip };
}
