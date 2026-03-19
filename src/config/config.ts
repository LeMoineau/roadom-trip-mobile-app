class Config {
  getEnv() {
    return {
      googleMapsApiURL: process.env["GOOGLE_MAPS_API_URL"]!,
      googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"]!,
      roadomTripApiURL: process.env["ROADOM_TRIP_API_URL"]!,
    };
  }
}

export default new Config();
