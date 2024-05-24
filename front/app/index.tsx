import {
  View,
  LinkText,
  Text,
  Image,
  Box,
} from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Box
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 26,
        }}
      >
        <Link href="/home/">
          <Image source={require('../assets/images/logo.png')} />
        </Link>
        <Text
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Ressources Relationnelles
        </Text>
      </Box>
      <Link href="/admin/" style={styles.linkButton}>
        <LinkText
          style={{ color: 'white', textDecorationLine: 'none' }}
        >
          Accéss admin
        </LinkText>
      </Link>
      <Link href="/connexion/" style={styles.linkButton}>
        <LinkText
          style={{ color: 'white', textDecorationLine: 'none' }}
        >
          Connectez vous
        </LinkText>
      </Link>
      <Link href="/home/" style={styles.linkButton}>
        <LinkText
          style={{ color: 'white', textDecorationLine: 'none' }}
        >
          Voir les ressources
        </LinkText>
      </Link>
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
  linkButton: {
    backgroundColor: '#020092',
    width: 200,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});
