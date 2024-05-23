import { View, LinkText, Text } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        This is the main page, and we're using gluestack-ui :)
      </Text>
      <Link href="/admin/">
        <LinkText>Go to admin route</LinkText>
      </Link>
      <Link href="/connexion/">
        <LinkText>Go to login route</LinkText>
      </Link>
      <Link href="/home/">
        <LinkText>Go to home route</LinkText>
      </Link>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
