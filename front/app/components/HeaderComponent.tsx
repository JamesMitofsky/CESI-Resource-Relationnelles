import React from 'react';
import { Box, Link, Image, Text } from '@gluestack-ui/themed'; // replace 'your-library' with the actual library you're using

const HeaderComponent = () => (
  <Box
    style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 26,
    }}
  >
    <Link href="/home/">
      <Image
        source={require('../../assets/images/logo.png')}
        alt="Logo"
      />
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
);

export default HeaderComponent;
