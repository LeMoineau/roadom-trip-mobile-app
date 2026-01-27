import { GeoPoint } from "../geo/GeoPoint.dto";

export interface Trip {
  startPos: GeoPoint;
  endingPos: GeoPoint;
  indices: string[];
}
