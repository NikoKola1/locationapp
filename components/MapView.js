//use react-native-maps to show location
//convert location name to coordinates and shows if its found
//Button to go back locationlist
//zoom so it doesnt show location too far or too close?

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";

export default function MapViewScreen() {

  //access navigation parameters. Location name from LocationList. State to store coords
  const route = useRoute();
  const locationName = String(route.params);
  const [coordinates, setCoordinates] = useState(null);

  //useEffect when LocationName change
  useEffect(() => {
      const fetchCoordinates = async () => {
        try {
          //request permission for acces devices location
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.error("Permission to access location was denied");
            return;
          }

          let geoData = await Location.geocodeAsync(locationName); //Convert name to coordinates
          if (geoData.length > 0) {
            setCoordinates(geoData[0]); //sets first result as location
          } else {
            console.error("Location not found"); //not existing location gives error
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };

      fetchCoordinates();
    }, [locationName]); //runs everytime when locationName change

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={
            coordinates
            ? { latitude: coordinates.latitude, longitude: coordinates.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
            : { latitude: 60.1699, longitude: 24.9384, latitudeDelta: 5, longitudeDelta: 5 } //Default Finland
          }
        >
          {coordinates && <Marker coordinate={coordinates} title={locationName} />}
        </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  locationText: { 
  fontSize: 18, 
  fontWeight: "bold", 
  textAlign: "center", 
  marginVertical: 10 },
});
