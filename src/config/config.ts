class Config {
  getEnv() {
    // return {
    //   openStreetMapURL: "https://nominatim.openstreetmap.org",
    //   googleMapsApiURL: "",
    //   googleMapsApiKey: "",
    //   roadomTripApiURL: "https://aleacarta-api.vercel.app",
    //   test: process.env.EXPO_PUBLIC_API_URL,
    // };
    return {
      openStreetMapURL: process.env["EXPO_PUBLIC_OPEN_STREET_MAP_URL"]!,
      googleMapsApiURL: process.env["EXPO_PUBLIC_GOOGLE_MAPS_API_URL"]!,
      googleMapsApiKey: process.env["GOOGLE_MAPS_API_KEY"]!,
      roadomTripApiURL: process.env["EXPO_PUBLIC_ROADOM_TRIP_API_URL"]!,
    };
  }
}

export default new Config();
