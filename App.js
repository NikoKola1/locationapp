import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createStackNavigator } from "@react-navigation/stack";
import LocationList from "./components/LocationList";
import AddLocForm from "./components/AddLocForm";
import MapViewScreen from "./components/MapView";
import { Ionicons } from "@expo/vector-icons";
import ManageLocs from "./components/ManageLocs";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F9F9F9",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            paddingBottom: 10
          }
        }}
      >
        <Tab.Screen
          name="Locations"
          component={LocationList}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
            headerTitle: "Locations",
          }}
        />
        <Tab.Screen
          name="Add Location"
          component={AddLocForm}
          options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
            headerTitle: "Add Location",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15, paddingBottom: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="MapView"
          component={MapViewScreen}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Manage Locations"
          component={ManageLocs}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="trash" size={size} color={color} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
