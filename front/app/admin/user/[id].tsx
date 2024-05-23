import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
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

export default function App() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [healthCard, setHealthCard] = useState<string>('');
  const [role, setRole] = useState<
    'user' | 'moderator' | 'admin' | 'superadmin'
  >('user');
  const [accountStatus, setAccountStatus] = useState<string>('');
  const [sharedResources, setSharedResources] = useState<string[]>(
    [],
  );
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/users/${id}`,
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleModifyUser = async () => {
    console.log('Modify User');
  };
  const handleValueChange = (newValue: string) => {
    console.log('Modify value');
  };

  return (
    <ScrollView style={styles.container}>
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
            source={require('../../../assets/images/logo.png')}
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
      <Box>
        <Card>
          <Link href="/admin/" style={styles.linkButton}>
            <Text>Return to home page</Text>
          </Link>
          {user ? (
            <>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '100%',
                }}
              >
                <Box
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    gap: 20,
                  }}
                >
                  {/* {user.categories.map(c => {
                    let imageUrl;
                    switch (c.categoryType) {
                      case 'Document':
                        imageUrl =
                          'https://fakeimg.pl/600x400/90c7bc/ffffff?text=Document';
                        break;
                      case 'Other':
                        imageUrl =
                          'https://fakeimg.pl/600x400?text=Other';
                        break;
                      case 'Image':
                        imageUrl =
                          'https://fakeimg.pl/600x400/a492b0/ffffff?text=Image';
                        break;
                      case 'Video':
                        imageUrl =
                          'https://fakeimg.pl/600x400/e08686/ffffff?text=Video';
                        break;
                      case 'Audio':
                        imageUrl =
                          'https://fakeimg.pl/600x400/dbd993/ffffff?text=Audio';
                        break;
                      default:
                        imageUrl =
                          'https://fakeimg.pl/600x400?text=Other';
                    }
                    return (
                      <Image
                        source={{ uri: imageUrl }}
                        style={{
                          width: 600,
                          height: 250,
                          borderRadius: 12,
                          marginTop: 12,
                        }}
                      />
                    );
                  })} */}

                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    First Name: {user.firstName}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Email: {user.email}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Phone: {user.phone}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Health Card: {user.healthCard}
                  </Text>
                </Box>
                <Box
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    gap: 20,
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Role:</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {user.role}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Account Status:
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {user.accountStatus}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Shared Resources:
                  </Text>
                  {user.sharedResources.map((resource, index) => (
                    <Text
                      key={index}
                      style={{ fontSize: 12, color: 'gray' }}
                    >
                      {resource}
                    </Text>
                  ))}
                  <Text style={{ fontWeight: 'bold' }}>Groups:</Text>
                  {user.groups.map((group, index) => (
                    <Text
                      key={index}
                      style={{ fontSize: 12, color: 'gray' }}
                    >
                      {group}
                    </Text>
                  ))}
                </Box>
              </Box>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Card>
      </Box>
      {/* <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <VStack>
                <Heading size="lg">Create User</Heading>
                <Text>Fill in the details to create a new user</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="xl">
                <Input>
                  <InputField
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Enter phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Enter health card"
                    value={healthCard}
                    onChange={e => setHealthCard(e.target.value)}
                  />
                </Input>
                <Select
                  onValueChange={value => setRole(value)}
                  placeholder="Select role"
                >
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="User" value="user" />
                      <SelectItem
                        label="Moderator"
                        value="moderator"
                      />
                      <SelectItem label="Admin" value="admin" />
                      <SelectItem
                        label="Superadmin"
                        value="superadmin"
                      />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <Input>
                  <InputField
                    placeholder="Enter account status"
                    value={accountStatus}
                    onChange={e => setAccountStatus(e.target.value)}
                  />
                </Input>
              </VStack>
            </ModalBody>
            <ModalFooter borderTopWidth="$0">
              <VStack space="lg" w="$full">
                <Button onPress={handleCreateUser}>
                  <ButtonText>Submit</ButtonText>
                </Button>
                <HStack space="xs" alignItems="center">
                  <Button
                    variant="link"
                    size="sm"
                    onPress={() => setShowModal(false)}
                  >
                    <ButtonIcon as={ArrowLeftIcon} />
                    <ButtonText>Back to main</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal> 
      </Center>*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
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
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});
