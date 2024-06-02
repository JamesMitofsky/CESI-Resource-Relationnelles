import React from 'react';
import {
  Box,
  Link,
  Image,
  Text,
  ArrowLeftIcon,
  Icon,
  LinkText,
} from '@gluestack-ui/themed'; // replace 'your-library' with the actual library you're using
import { StyleSheet } from 'react-native';
import { Link as ExpoLink } from 'expo-router';

const ReturnButtonComponent = () => (
  <Box style={{ width: '100%' }}>
    <ExpoLink href="/" style={styles.linkButton}>
      <Icon
        as={ArrowLeftIcon}
        color="$textLight50"
        sx={{
          _dark: {
            color: '$textDark50',
          },
        }}
      />
      <LinkText
        color="$textLight50"
        sx={{
          _dark: {
            color: '$textDark50',
          },
        }}
        fontSize="$lg"
      >
        Retour
      </LinkText>
    </ExpoLink>
  </Box>
);

const styles = StyleSheet.create({
  linkButton: {
    backgroundColor: '#020092',
    width: 100,
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

export default ReturnButtonComponent;
