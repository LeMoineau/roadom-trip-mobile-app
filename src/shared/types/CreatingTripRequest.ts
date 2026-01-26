export interface CreatingTripRequest {
  startPos: [number, number];
  distanceTrip: number;
}

export function isCreatingTripRequest(req: any): req is CreatingTripRequest {
  return (
    !!req &&
    req.startPos &&
    Array.isArray(req.startPos) &&
    req.startPos.length === 2
  );
}
