import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  FormControl,
  Box,
  LinkText,
  Input,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
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
} from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';
import { Link as ExpoLink } from 'expo-router';
import SideContainerWeb from '../SideContainerWeb';
import axios from 'axios';
import { BASE_URL } from '../../../globals/port';
const signUpSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  firstName: z.string().min(1, 'Le prénom est requis'),
  password: z.string(),
  // .min(6, 'Doit contenir au moins 6 caractères')
  // .regex(new RegExp('.*[A-Z].*'), 'Un caractère majuscule')
  // .regex(new RegExp('.*[a-z].*'), 'Un caractère minuscule')
  // .regex(new RegExp('.*\\d.*'), 'Un numéro')
  // .regex(
  //   new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
  //   'Un caractère spécial',
  // ),
  confirmPassword: z.string(),
  // .min(6, 'Doit contenir au moins 6 caractères')
  // .regex(new RegExp('.*[A-Z].*'), 'Un caractère majuscule')
  // .regex(new RegExp('.*[a-z].*'), 'Un caractère minuscule')
  // .regex(new RegExp('.*\\d.*'), 'Un numéro')
  // .regex(
  //   new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
  //   'Un caractère spécial',
  // ),
  phone: z
    .string()
    .min(
      10,
      'Le numéro de téléphone doit contenir au moins 10 chiffres',
    ),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email('Email invalide'),
  healthCard: z
    .string()
    .refine(
      healthCard =>
        healthCard.length === 13 && !isNaN(Number(healthCard)),
      'La numéro de votre Carte Vitale doit être un nombre de 13 chiffres',
    ),
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" mb="$5" space="md">
      <HStack space="md" alignItems="center">
        <ExpoLink href="/connexion/">
          <Icon
            as={ArrowLeftIcon}
            color="$textLight50"
            sx={{ _dark: { color: '$textDark50' } }}
          />
        </ExpoLink>
        <Text
          color="$textLight50"
          sx={{ _dark: { color: '$textDark50' } }}
          fontSize="$lg"
        >
          Inscription
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
  const toast = useToast();
  const onSubmit = (_data: SignUpSchemaType) => {
    if (_data.password === _data.confirmPassword) {
      const createUser = async () => {
        // console.log(_data);
        try {
          const response = await axios.post(
            `${BASE_URL}/api/users`,
            _data,
          );

          console.log(response);

          toast.show({
            placement: 'bottom right',
            render: ({ id }) => {
              return (
                <Toast
                  nativeID={id}
                  variant="accent"
                  action="success"
                >
                  <ToastTitle>
                    L'inscription a été couronnée de succès !
                  </ToastTitle>
                </Toast>
              );
            },
          });
        } catch (error) {
          console.error(error);
          toast.show({
            placement: 'bottom right',
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="error">
                  <ToastTitle>
                    Il y avait une erreur. Peut-être cet utilisateur
                    existe déjà.
                  </ToastTitle>
                </Toast>
              );
            },
          });
        }
      };

      createUser();
    } else {
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error">
              <ToastTitle>
                Les mots de passe ne matchent pas.
              </ToastTitle>
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
      <VStack justifyContent="space-between" gap={'$2'}>
        <FormControl isInvalid={!!errors.name} isRequired={true}>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Nom"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.name?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.firstName} isRequired={true}>
          <Controller
            name="firstName"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Prénom"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.firstName?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired={true}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Mot de passe"
                  fontSize="$sm"
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl
          isInvalid={!!errors.confirmPassword}
          isRequired={true}
        >
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Mot de passe"
                  fontSize="$sm"
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.confirmPassword?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.phone} isRequired={true}>
          <Controller
            name="phone"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Téléphone"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.phone?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.email} isRequired={true}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Email"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
          isInvalid={!!errors.healthCard}
          isRequired={true}
        >
          <Controller
            name="healthCard"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Numéro de Carte Vitale"
                  fontSize="$sm"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
              {errors?.healthCard?.message}
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
            value="Souvenir de moi"
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
