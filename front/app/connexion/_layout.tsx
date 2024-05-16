import React from 'react';
import {
  Box,
  StatusBar,
  ScrollView,
  VStack,
  KeyboardAvoidingView,
  GluestackUIProvider,
} from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { config } from '../../gluestack-style.config';

export default function GuestLayout() {
  return (
    <GluestackUIProvider config={config}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Box
          sx={{
            _web: {
              height: '100vh',
              overflow: 'hidden',
            },
          }}
          height="$full"
        >
          <StatusBar
            translucent
            backgroundColor="$none"
            barStyle="light-content"
          />
          <ScrollView
            flex={1}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            sx={{
              '@base': {
                _light: {
                  bg: '$primary500',
                },
              },
              '@md': {
                _light: {
                  bg: '$primary900',
                },
                p: '$8',
              },
              _dark: {
                bg: '$backgroundDark900',
              },
            }}
            bounces={false}
          >
            <VStack
              w="$full"
              flex={1}
              overflow="hidden"
              sx={{
                '@md': {
                  maxWidth: '$containerWidth',
                  flexDirection: 'row',
                  rounded: '$xl',
                  flex: undefined,
                },
              }}
            >
              <Slot
                screenOptions={{
                  headerShown: false,
                }}
              />
            </VStack>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </GluestackUIProvider>
  );
}
