import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import Packing from "./src/screens/Packing";

export default function App() {
  return (
    <View>
      <Navigation />
      <Packing/>
    </View>
  );
}

