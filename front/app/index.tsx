import { View, LinkText, Text } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../components/context/AuthContext';

export default function App() {
  const { authState } = useAuth();
  return (
    <View style={styles.container}>
      <Text>
        {authState?.authenticated
          ? 'You are authenticated'
          : 'You are not authenticated'}
      </Text>

      <Link href="/connexion/">
        <LinkText>Go to nested route</LinkText>
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
