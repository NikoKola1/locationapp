//inputs for name, description and rating 1 to 5star
//add new location button to save firestore
//updates LocationList after pressin button
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "./AddLocButton";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating-widget";
import { addLocation } from "../firebase/FirestoreController";
import { Ionicons } from "@expo/vector-icons";

export default function AddLocForm() {

  const navigation = useNavigation();

  //state variables to store userinpit for new location
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  //handles adding new location, gives alert for user to fill all fiels, after adding new loc -> takes user to previous screen
  const handleAdd = async () => {
    if (!name || !description || rating === 0) {
      alert("Fill all fields.");
      return;
    }
    try {
      //add new loc to firestore
      await addLocation(name, description, rating);
      console.log("Location added:", { name, description, rating });

      //reset fields
      setName("");
      setDescription("");
      setRating("");
  
      //navigate back to loclist
      navigation.goBack();
    } catch (error) {
      console.error("Error adding location:", error);
      alert("Error adding location. Try again");
    }
  };

  return (
 
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName}/>
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription}/>
      <View style={styles.ratingContainer}>
        <StarRating rating={rating} onChange={setRating} starSize={50}/>
      </View>
      <CustomButton title="Add location" onPress={handleAdd}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10},
  backButton: { position: "absolute", left: 0},
  heading: { fontSize: 20, fontWeight: "bold"},
  input: { borderWidth: 1, borderColor: "black", padding: 10, marginBottom: 10 },

  ratingContainer: { alignItems: "center", marginBottom: 10}
});