import { LinkText, View } from "@gluestack-ui/themed";
import { StyleSheet, Text } from "react-native";
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>welcome to nested route</Text>
      <Link href="/">
        <LinkText>Go home</LinkText>
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
