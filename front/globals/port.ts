import { Platform } from 'react-native';

const PORT = process.env.EXPO_PUBLIC_PORT || 5000;

export const BASE_URL =
  Platform.OS === 'android'
    ? `http://10.0.2.2:${PORT}`
    : `http://localhost:${PORT}`;
