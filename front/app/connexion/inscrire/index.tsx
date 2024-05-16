import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  Center,
  FormControl,
  Box,
  LinkText,
  Input,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  FormControlHelper,
  Toast,
  ToastTitle,
  useToast,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  ButtonText,
  Heading,
  ArrowLeftIcon,
  InputField,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
} from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';
import { Link as ExpoLink } from 'expo-router';
import { FakeUserInterface } from '../../../types/user';

const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character',
    ),
  confirmpassword: z
    .string()
    .min(6, 'Must be at least 8 characters in length')
    .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
    .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
    .regex(new RegExp('.*\\d.*'), 'One number')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'One special character',
    ),
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;
function SideContainerWeb() {
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
      {/* <Image
        h="$10"
        w="$80"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require('./assets/images/gluestackUiProLogo_web_light.svg')}
      /> */}
    </Center>
  );
}
function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" mb="$5" space="md">
      <HStack space="md" alignItems="center">
        <Link>
          <Icon
            as={ArrowLeftIcon}
            color="$textLight50"
            sx={{ _dark: { color: '$textDark50' } }}
          />
        </Link>
        <Text
          color="$textLight50"
          sx={{ _dark: { color: '$textDark50' } }}
          fontSize="$lg"
        >
          Sign Up
        </Text>
      </HStack>
      <VStack space="xs" ml="$1" my="$4">
        <Heading
          color="$textLight50"
          sx={{ _dark: { color: '$textDark50' } }}
        >
          Welcome
        </Heading>
        <Text
          color="$primary300"
          fontSize="$md"
          sx={{
            _dark: {
              color: '$textDark400',
            },
          }}
        >
          Sign up to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const SignUpForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [pwMatched, setPwMatched] = useState(false);
  const toast = useToast();
  const onSubmit = (_data: SignUpSchemaType) => {
    if (_data.password === _data.confirmpassword) {
      // contact the server and send over all the info.

      // here's a fake user
      const fakeUser: FakeUserInterface = {
        name: 'John Doe',
        firstName: 'John',
        password: 'password123',
        phone: '06 90 23 68 12',
        email: 'john.doe@example.com',
        healthCard: 'HC123456789',
        role: 'user',
        accountStatus: 'active',
        sharedResources: [
          '60d5ecb8b392d78866f8cd3d',
          '60d5ecb8b392d78866f8cd3e',
        ],
        groups: [
          '60d5ecb8b392d78866f8cd3f',
          '60d5ecb8b392d78866f8cd40',
        ],
      };

      setPwMatched(true);
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Signed up successfully</ToastTitle>
            </Toast>
          );
        },
      });
      reset();
    } else {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
    // Implement your own onSubmit and navigation logic here.
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword(showState => {
      return !showState;
    });
  };
  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl
          isInvalid={
            (!!errors.email || isEmailFocused) && !!errors.email
          }
          isRequired={true}
        >
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signUpSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Email"
                  fontSize="$sm"
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
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl
          isInvalid={!!errors.password}
          isRequired={true}
          my="$6"
        >
          <Controller
            defaultValue=""
            name="password"
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signUpSchema.parseAsync({
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
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>
          <FormControlHelper></FormControlHelper>
        </FormControl>
        <FormControl
          isInvalid={!!errors.confirmpassword}
          isRequired={true}
        >
          <Controller
            defaultValue=""
            name="confirmpassword"
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signUpSchema.parseAsync({
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
                  placeholder="Confirmer le mot de passe"
                  fontSize="$sm"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showConfirmPassword ? 'text' : 'password'}
                />

                <InputSlot onPress={handleConfirmPwState} pr="$3">
                  <InputIcon
                    as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                  />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="sm" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.confirmpassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
            mt="$5"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel
              sx={{
                _text: {
                  fontSize: '$sm',
                },
              }}
            >
              J'acccepte les
              <ExpoLink href="/">
                <LinkText
                  sx={{
                    _ios: {
                      marginTop: '$0.5',
                    },
                    _android: {
                      marginTop: '$0.5',
                    },
                  }}
                >
                  Conditions d'utilisation
                </LinkText>
              </ExpoLink>
              &{' '}
              <Link>
                <LinkText
                  sx={{
                    _ios: {
                      marginTop: '$0.5',
                    },
                    _android: {
                      marginTop: '$0.5',
                    },
                  }}
                >
                  Privacy Policy
                </LinkText>
              </Link>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        mt="$5"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText fontSize="$sm">INSCRIRE</ButtonText>
      </Button>
    </>
  );
};
function SignUpFormComponent() {
  return (
    <>
      <Box sx={{ '@md': { display: 'none' } }}>
        <MobileHeader />
      </Box>
      <Box
        flex={1}
        bg="$backgroundLight0"
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
        px="$4"
        py="$8"
        justifyContent="space-between"
        borderTopLeftRadius="$2xl"
        borderTopRightRadius="$2xl"
        borderBottomRightRadius="$none"
      >
        <Heading
          display="none"
          mb="$8"
          sx={{
            '@md': { display: 'flex', fontSize: '$2xl' },
          }}
        >
          Inscrivez-vous
        </Heading>
        <SignUpForm />
        <HStack
          space="xs"
          alignItems="center"
          justifyContent="center"
          mt="auto"
        >
          <Text
            color="$textLight500"
            sx={{
              _dark: {
                color: '$textDark400',
              },
            }}
            fontSize="$sm"
          >
            Avez-vous déjà un compte ?
          </Text>
          <ExpoLink href="/connexion/">
            <LinkText fontSize="$sm">Connexion</LinkText>
          </ExpoLink>
        </HStack>
      </Box>
    </>
  );
}
export default function SignUp() {
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
        <SignUpFormComponent />
      </Box>
    </>
  );
}
