//displays list of saved locations
//fetch loc from firestore
//click marker to go mapview

import React from "react";
import { View, Text, Button } from "react-native";

export default function LocationList({ navigation }) {
  return (
    <View>
      <Text>Location List</Text>
      <Button title="Go Add Location" onPress={() => navigation.navigate("Add Location")} />
      <Button title="Go Map View" onPress={() => navigation.navigate("Map View")} />
    </View>
  );
}


