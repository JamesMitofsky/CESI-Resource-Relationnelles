import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  KeyboardAvoidingView,
  SafeAreaView,
} from '@gluestack-ui/themed';
import { Slot } from 'expo-router';

export default function GuestLayout() {
  return (
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
          <SafeAreaView flex={1}>
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
              <Slot />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}
