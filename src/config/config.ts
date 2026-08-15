class Config {
  getEnv() {
    return {
      openStreetMapURL: process.env["OPEN_STREET_MAP_URL"]!,
      googleMapsApiURL: process.env["GOOGLE_MAPS_API_URL"]!,
      googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"]!,
      roadomTripApiURL: "http://10.93.189.167:3001",
      // process.env["ROADOM_TRIP_API_URL"] ?? "http://localhost:3001",
    };
  }
}

export default new Config();
