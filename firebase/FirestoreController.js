import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./Config";

const LOCATIONS_COLLECTION = "locations";

// Function to add a new location to Firestore
export const addLocation = async (name, description, rating) => {
  try {
    const docRef = await addDoc(collection(db, LOCATIONS_COLLECTION), {
      name,
      description,
      rating
    });
    console.log("Location added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding location:", error);
    return null;
  }
};

// Function to fetch all locations from Firestore
export const fetchLocations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, LOCATIONS_COLLECTION));
    const locations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched locations:", locations);
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};