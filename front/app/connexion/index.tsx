import React, { useState } from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Link,
  useToast,
  Box,
  CheckIcon,
  Checkbox,
  Icon,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  FormControlHelper,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  ButtonText,
  ArrowLeftIcon,
  Heading,
  LinkText,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
} from '@gluestack-ui/themed';

import { Link as ExpoLink } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import SideContainerWeb from './SideContainerWeb';
import { useAuth } from '../../components/context/AuthContext';
import { BASE_URL } from '../../globals/port';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string(),
  rememberme: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const toast = useToast();

  const { onLogin } = useAuth();

  const onSubmit = (_data: SignInSchemaType) => {
    // do the submission logic here

    // here's a fake user
    const fakeUser = {
      email: '1234@gmail.com',
      password: '1234',
    };

    console.log('Fake user:', fakeUser);
    const loginUser = async () => {
      try {
        const result = await onLogin!(
          fakeUser.email,
          fakeUser.password,
        );
      } catch (error) {
        console.error(error);
      }

      const deleteResource = async () => {
        const id = '65cf6b2dd292430927f02e67';
        try {
          console.log('\n\n\nTry to delete resource\n\n\n');
          const response = await fetch(
            `${BASE_URL}/api/resources/${id}`,
            {
              method: 'DELETE',
            },
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          console.log(response);

          return await response.json();
        } catch (error) {
          console.error('Error deleting resource:', error);
        }
      };

      deleteResource();

      // toast.show({
      //   placement: 'bottom right',
      //   render: ({ id }) => {
      //     return (
      //       <Toast nativeID={id} variant="accent" action="success">
      //         <ToastTitle>Signed in successfully</ToastTitle>
      //       </Toast>
      //     );
      //   },
      // });
      // reset()
    };

    loginUser();
    // Implement your own onSubmit and navigation logic here.
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl isInvalid={!!errors.email} isRequired={true}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signInSchema.parseAsync({
                    email: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Email"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl
          my="$6"
          isInvalid={!!errors.password}
          isRequired={true}
        >
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signInSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Mot de passe"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={handleState} pr="$3">
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                  />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="sm" />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>

          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <Link ml="auto">
        <LinkText fontSize="$xs">Mot de pass oublié ?</LinkText>
      </Link>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            my="$5"
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Souvienir de moi</CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        mt="$5"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText fontSize="$sm">CONNEXION</ButtonText>
      </Button>
    </>
  );
};

function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" space="md">
      <HStack space="md" alignItems="center">
        <Link>
          <Icon
            as={ArrowLeftIcon}
            color="$textLight50"
            sx={{
              _dark: {
                color: '$textDark50',
              },
            }}
          />
        </Link>
        <Text
          color="$textLight50"
          sx={{
            _dark: {
              color: '$textDark50',
            },
          }}
          fontSize="$lg"
        >
          Connexion
        </Text>
      </HStack>
      <VStack space="xs" ml="$1" my="$4">
        <Heading
          color="$textLight50"
          sx={{
            _dark: {
              color: '$textDark50',
            },
          }}
        >
          Bonjour !
        </Heading>
        <Text
          fontSize="$md"
          fontWeight="normal"
          color="$primary300"
          sx={{
            _dark: {
              color: '$textDark400',
            },
          }}
        >
          Sign in to continue
        </Text>
      </VStack>
    </VStack>
  );
}

function LoginFormComponent() {
  return (
    <Box flex={1}>
      <>
        <Box
          sx={{
            '@md': { display: 'none' },
          }}
        >
          <MobileHeader />
        </Box>
        <Box
          px="$4"
          sx={{
            '@md': {
              px: '$8',
              borderTopLeftRadius: '$none',
              borderTopRightRadius: '$none',
              borderBottomRightRadius: '$none',
            },
            _dark: {
              bg: '$backgroundDark800',
            },
          }}
          py="$8"
          flex={1}
          bg="$backgroundLight0"
          justifyContent="space-between"
          borderTopLeftRadius="$2xl"
          borderTopRightRadius="$2xl"
          borderBottomRightRadius="$none"
        >
          <Heading
            display="none"
            mb="$8"
            sx={{
              '@md': {
                display: 'flex',
                fontSize: '$2xl',
              },
            }}
          >
            Connectez-vous à votre compte
          </Heading>
          <SignInForm />
          <HStack
            space="xs"
            alignItems="center"
            justifyContent="center"
            mt="auto"
          >
            <Text
              color="$textLight500"
              fontSize="$sm"
              sx={{
                _dark: {
                  color: '$textDark400',
                },
              }}
            >
              Pas de compte ?
            </Text>
            <ExpoLink href="/connexion/inscrire/">
              <LinkText fontSize="$sm">Inscrivez-vous !</LinkText>
            </ExpoLink>
          </HStack>
        </Box>
      </>
    </Box>
  );
}

export default function SignIn() {
  return (
    <>
      <Box
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        flex={1}
        display="none"
      >
        <SideContainerWeb />
      </Box>
      <Box flex={1}>
        <LoginFormComponent />
      </Box>
    </>
  );
}
