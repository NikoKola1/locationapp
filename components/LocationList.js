//displays list of saved locations
//fetch loc from firestore
//click marker to go mapview
import { fetchLocations } from "../firebase/FirestoreController";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "./AddLocButton";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";

export default function LocationList({ navigation }) {
  
  const [locations, setLocations] = useState([]);

  //fetch locations from firestore when component loads
  useFocusEffect(
    React.useCallback(() => {
      const loadLocations = async () => {
        const data = await fetchLocations();
        setLocations(data);
      };
      loadLocations();
    }, [])
  );

  return (
    <View style={styles.container}>
       
      {/*button goest to Add location screen*/}
      {/*<CustomButton title="Add new location" onPress={() => navigation.navigate("Add Location")}/>*/}

      {/*Location list that show loc name, description and star rating. And icon that takes user to map view by tapping it*/}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <View style={styles.locationInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <StarRatingDisplay rating={item.rating} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("MapView", { locationName: item.name })}>
                <Ionicons name="location-sharp" size={24} color="red" style={styles.markerIcon}/>
            </TouchableOpacity>
          </View>

        )}
      />
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  locationItem: {
    flexDirection:"row", //marker
    justifyContent:"space-between", //marker
    alignItems: "center", //marker
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 18, fontWeight: "bold", paddingBottom:20 }, //name of loc
  description: { fontSize: 14, color: "#555", marginBottom: 5  }, //description of loc
});


