import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, GluestackUIProvider } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { config } from "../gluestack-style.config";

export default function AppLayout() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Slot screenOptions={{ headerShown: false }} />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
