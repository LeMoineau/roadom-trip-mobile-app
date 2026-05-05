class Config {
  getEnv() {
    return {
      googleMapsApiURL: process.env["GOOGLE_MAPS_API_URL"]!,
      googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"]!,
      roadomTripApiURL: "http://172.19.162.167:3001",
      // process.env["ROADOM_TRIP_API_URL"] ?? "http://localhost:3001",
    };
  }
}

export default new Config();
