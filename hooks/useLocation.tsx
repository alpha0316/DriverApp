import { useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const getUserLocation = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the current position
      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        const { latitude, longitude } = coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        setLatitude(latitude);
        setLongitude(longitude);

        // Reverse geocode to get address information
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        console.log("User Location:", response);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Error fetching location");
    }
  };

  // Return the values and the function to trigger location fetching
  return {
    latitude,
    longitude,
    errorMsg,
    getUserLocation,
  };
};

export default useLocation;
