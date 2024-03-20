import {
  Button,
  View,
  ButtonText, GluestackUIProvider
} from "@gluestack-ui/themed";
import { StyleSheet, Text } from "react-native";
import { config } from "./gluestack-style.config";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <Text>Has gluestack and button :)</Text>
        <Button onPress={() => alert("Hello")}>
          <ButtonText>Add </ButtonText>
        </Button>
        <Text>Open up App.tsx to start working on your app!</Text>
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
