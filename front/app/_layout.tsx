import { Slot } from 'expo-router';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { config } from '../gluestack-style.config';

export default function AppLayout() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        translucent
        backgroundColor="$none"
        barStyle="light-content"
      />
      <Slot />
    </GluestackUIProvider>
  );
}
