import { GluestackUIProvider, Box, View } from "@gluestack-ui/themed";
import { StyleSheet, Text } from "react-native";

export default function App() {
  return (
    <GluestackUIProvider>
      <View style={styles.container}>
        <Box width="100%" justifyContent="center" alignItems="center">
          <Text>Has gluestack provider :)</Text>
        </Box>
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
