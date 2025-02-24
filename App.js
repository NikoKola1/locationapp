import React from "react";
//import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationList from "./components/LocationList";
import AddLocForm from "./components/AddLocForm";
import MapViewScreen from "./components/MapView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Locations" component={LocationList} />
        <Stack.Screen name="Add Location" component={AddLocForm} />
        <Stack.Screen name="MapView" component={MapViewScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
