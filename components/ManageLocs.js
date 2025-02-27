import { fetchLocations, deleteLocation } from "../firebase/FirestoreController";
import React, { useState,useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
//import CustomButton from "./AddLocButton";
import { Ionicons } from "@expo/vector-icons";

export default function ManageLocs({ navigation }) {
    const [locations, setLocations] = useState([]);
  
    //fetch locations from Firestore when component loads
    useEffect(() => {
      const loadLocations = async () => {
        const data = await fetchLocations();
        setLocations(data);
      };
      loadLocations();
    }, []);
  
    //function to handle delete
    const handleDelete = async (id) => {
      Alert.alert("Delete location", "Do you want to delete this location?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", onPress: async () => {
            await deleteLocation(id);
            setLocations((prev) => prev.filter((loc) => loc.id !== id));
          },
          style: "destructive",
        },
      ]);
    };

  return (
    <View style={styles.container}>

      {/*Location list that show loc name, description and star rating. And icon that takes user to map view by tapping it*/}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <View style={styles.locationInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <View>
                <Ionicons name="trash" size={24} color="red" style={styles.trashIcon}/>
              </View>
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
