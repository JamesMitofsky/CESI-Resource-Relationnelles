import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  Modal,
  ButtonText,
  Card,
  Center,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  Heading,
  HStack,
  Input,
  InputField,
  Image,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Toast,
  ToastTitle,
  useToast,
  VStack,
  Box,
  AddIcon,
  Fab,
  FabIcon,
  FabLabel,
} from '@gluestack-ui/themed';
import { UserInterface } from '../../../types/user';
import { BASE_URL } from '../../../globals/port';
import { Link, useLocalSearchParams } from 'expo-router';
import { resolveHref } from 'expo-router/build/link/href';
import HeaderComponent from '../../components/HeaderComponent';
import { Picker } from '@react-native-picker/picker';
import { useMediaQuery } from 'react-responsive';

export default function App() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [healthCard, setHealthCard] = useState('');
  const [role, setRole] = useState<
    'user' | 'moderator' | 'admin' | 'superadmin'
  >('user');
  const [accountStatus, setAccountStatus] = useState('');
  const [sharedResources, setSharedResources] = useState<string[]>(
    [],
  );
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/users/${id}`,
        );
        const user = response.data;
        setUser(response.data);
        setName(user.name);
        setFirstName(user.firstName);
        setEmail(user.email);
        setPassword(user.password);
        setPhone(user.phone);
        setHealthCard(user.healthCard);
        setRole(user.role);
        setAccountStatus(user.accountStatus);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleModifyUser = async () => {
    const data = {
      name,
      firstName,
      password,
      phone,
      email,
      healthCard,
      role,
      accountStatus,
    };

    try {
      console.log('Data:', data); // Debugging
      console.log(JSON.stringify(data, null, 2));
      const response = await axios.put(
        `${BASE_URL}/api/users/${id}`,
        data,
      );
      console.log('User modified::', response.data);
      toast.show({
        placement: 'top right',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast
              nativeID={toastId}
              variant="accent"
              action="success"
            >
              <ToastTitle>
                La modification d'un utilisateur a été realisé !
              </ToastTitle>
              <Link href="/admin/">Retour</Link>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error('Failed to modify user:', error);
      toast.show({
        placement: 'top right',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="error">
              <ToastTitle>
                Il y avait une erreur. La modification d'un
                utilisateur a échoué !
              </ToastTitle>
              <Link href="/admin/">Retour</Link>
            </Toast>
          );
        },
      });
    }
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width:720px)',
  });

  const Stack = isDesktopOrLaptop ? HStack : VStack;
  return (
    <ScrollView style={styles.container}>
      <Box>
        <HeaderComponent />
        <Card>
          <Link href="/admin/" style={styles.linkButton}>
            <Text>Retour</Text>
          </Link>
          {user ? (
            <Stack>
              <Box
                style={{
                  flex: 1,
                  paddingRight: 10,
                  marginBottom: 20, // Replaced 'gap' with 'marginBottom'
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 10,
                  }}
                >
                  Détails de l'utilisateur
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  📝 Prénom: {user.firstName}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  📧 Email: {user.email}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  📞 Téléphone: {user.phone}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  🏥 Carte vitale: {user.healthCard}
                </Text>
              </Box>
              <Box
                style={{
                  flex: 1,
                  paddingRight: 10,
                  marginBottom: 20, // Replaced 'gap' with 'marginBottom'
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 10,
                  }}
                >
                  Autres informations
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  📚 Rôle: {user.role}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  📈 Statut du compte: {user.accountStatus}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  🔄 Ressources partagées:{' '}
                  {user.sharedResources.length >= 1
                    ? user.sharedResources.join(', ')
                    : 'Aucune ressource partagée'}
                </Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>
                  🏷️ Groupes:{' '}
                  {user.groups.length >= 1
                    ? user.groups.join(', ')
                    : 'Aucun groupe'}
                </Text>
                <Button
                  onPress={() => setShowModal(true)}
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    display: 'flex',
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    Modifier l'utilisateur
                  </Text>
                </Button>
              </Box>
            </Stack>
          ) : (
            <Text>Loading...</Text>
          )}
        </Card>
        <Center>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <VStack alignItems="flex-start">
                  <Button
                    variant="link"
                    size="sm"
                    onPress={() => setShowModal(false)}
                  >
                    <ButtonIcon as={ArrowLeftIcon} />
                    <ButtonText>Retour</ButtonText>
                  </Button>
                  <Heading size="lg">
                    Modifier cet utilisateur
                  </Heading>
                  <Text>
                    Renseigner tous les informations de l'utilisateur
                  </Text>
                </VStack>
              </ModalHeader>
              <ModalBody>
                <VStack
                  space="sm"
                  style={{ height: 400, overflow: 'scroll' }}
                >
                  <Text>Le nom de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                  />
                  <Text>Le prénom de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <Text>L'email de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  {/* <Text>Le mot de passe de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                  /> */}
                  <Text>Le téléphone de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                  />
                  <Text>La carte de santé de l'utilisateur?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Health Card"
                    value={healthCard}
                    onChangeText={setHealthCard}
                  />
                  <Text>Le rôle de l'utilisateur?</Text>
                  <Picker
                    selectedValue={role}
                    style={styles.input}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setRole(itemValue)
                    }
                  >
                    <Picker.Item label="Utilisateur" value="user" />
                    <Picker.Item
                      label="Moderateur"
                      value="moderator"
                    />
                    <Picker.Item label="Admin" value="admin" />
                    <Picker.Item
                      label="Super Admin"
                      value="superadmin"
                    />
                  </Picker>
                  <Text>Le statut du compte de l'utilisateur?</Text>
                  <Picker
                    selectedValue={accountStatus}
                    style={styles.input}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setAccountStatus(itemValue)
                    }
                  >
                    <Picker.Item label="Active" value="active" />
                    <Picker.Item label="Inactive" value="inactive" />
                  </Picker>
                </VStack>
              </ModalBody>
              <ModalFooter borderTopWidth="$0">
                <VStack space="lg" w="$full" alignItems="center">
                  <Link href="/admin/">
                    <Pressable
                      onPress={handleModifyUser}
                      accessibilityLabel="Button to submit and modify a user"
                      style={styles.button}
                    >
                      <Text>Confirmer la modification</Text>
                    </Pressable>
                  </Link>
                  <Text style={{ textAlign: 'center' }}>
                    Si vous souhaitez supprimer cet utilisateur
                    cliquez ci-dessous 👇
                  </Text>
                  <Link href="/admin/">
                    <Pressable
                      style={{
                        borderRadius: 12,
                        backgroundColor: 'red',
                        padding: 12,
                        width: '100%',
                      }}
                      onPress={async () => {
                        try {
                          await axios.delete(
                            `${BASE_URL}/api/users/${id}`,
                          );
                          setShowModal(false);
                          resolveHref('/admin/');
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      <Text style={{ color: 'white' }}>
                        Supprimer le compte
                      </Text>
                    </Pressable>
                  </Link>
                </VStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  webContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 16,
    marginTop: 8,
  },
  categories: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  uploader: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  status: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  linkButton: {
    backgroundColor: '#020092',
    width: 200,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
    textDecorationLine: 'none',
    marginBottom: 18,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'grey',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
