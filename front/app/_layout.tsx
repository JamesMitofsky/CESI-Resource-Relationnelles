import { Slot } from 'expo-router';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { config } from '../gluestack-style.config';
import { AuthProvider } from '../components/context/AuthContext';

export default function AppLayout() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <StatusBar
          translucent
          backgroundColor="$none"
          barStyle="light-content"
        />
        <Slot />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
