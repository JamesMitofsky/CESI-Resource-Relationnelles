import { View, LinkText, Text } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>This is the home page of the app for stuff</Text>

      <Link href="/">
        <LinkText>
          This leads back to the main route which will eventually be used for
          managing state, etc.
        </LinkText>
      </Link>
    </View>
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
