import { Center, Image } from '@gluestack-ui/themed';

export default function SideContainerWeb() {
  return (
    <Center
      bg="$primary500"
      flex={1}
      sx={{
        _dark: {
          bg: '$primary500',
        },
      }}
    >
      <Image
        h="$full"
        w="$64"
        alt="Ressources Relationnelles Logo"
        resizeMode="contain"
        source={require('../../assets/images/logo.png')}
      />
    </Center>
  );
}
