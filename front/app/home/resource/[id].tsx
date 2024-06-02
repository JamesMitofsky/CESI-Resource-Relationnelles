import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  VStack,
  Box,
  AddIcon,
  Fab,
  FabIcon,
  FabLabel,
} from '@gluestack-ui/themed';
import { Resource } from '../../../types/resource';
import { BASE_URL } from '../../../globals/port';
import { Link, useLocalSearchParams } from 'expo-router';
import { resolveHref } from 'expo-router/build/link/href';
import { useMediaQuery } from 'react-responsive';
import HeaderComponent from '../../components/HeaderComponent';

export default function App() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploader, setUploader] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/resources/${id}`,
        );
        setResource(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResource();
  }, [id]);

  const handleModifyResource = async () => {
    console.log('Modify resource');
  };
  const handleValueChange = (newValue: string) => {
    console.log('Modify value');
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });

  const Stack = isDesktopOrLaptop ? HStack : VStack;

  return (
    <ScrollView style={styles.container}>
      <Box>
        <HeaderComponent />
        <Card>
          <Link href="/home/" style={styles.linkButton}>
            <Text>Retour</Text>
          </Link>
          {resource ? (
            <>
              {/* <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '100%',
                }}
              > */}
              <Stack>
                <Box
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    gap: 20,
                  }}
                >
                  {resource.categories.map(c => {
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
                        alt="Image-Resource-Type"
                        style={{
                          width: 600,
                          height: 250,
                          borderRadius: 12,
                          marginTop: 12,
                        }}
                      />
                    );
                  })}

                  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {resource.title}
                  </Text>

                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Uploader: {resource.uploader}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Is Archived: {resource.isArchived ? 'Yes' : 'No'}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    Is Favorite: {resource.isFavorite ? 'Yes' : 'No'}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Categories:
                  </Text>
                  {resource.categories.map((category, index) => (
                    <Text
                      key={index}
                      style={{ fontSize: 12, color: 'gray' }}
                    >
                      {category.categoryType}
                    </Text>
                  ))}
                  <Button
                    onPress={() => setShowModal(true)}
                    bgColor="gray"
                    style={{ width: 200 }}
                  >
                    <ButtonText>Modifier la ressource</ButtonText>
                  </Button>
                </Box>
                <Box
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      margin: 20,
                    }}
                  >
                    {resource.type}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Comments:
                  </Text>
                  {resource.comments.map((comment, index) => (
                    <Box
                      key={index}
                      style={{
                        padding: 10,
                        margin: 5,
                        borderRadius: 10,
                        backgroundColor: '#f0f0f0',
                        alignSelf:
                          comment.commenter === 'current user'
                            ? 'flex-end'
                            : 'flex-start',
                        maxWidth: '80%',
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>
                        {comment.content}
                      </Text>
                      <Text style={{ fontSize: 12, color: 'gray' }}>
                        User : {comment.commenter} | Date:{' '}
                        {comment.creationDate
                          ? new Date(
                              comment.creationDate,
                            ).toLocaleDateString()
                          : 'N/A'}
                        {comment.creationDate
                          ? new Date(
                              comment.creationDate,
                            ).toLocaleTimeString()
                          : 'N/A'}
                      </Text>
                    </Box>
                  ))}
                  <Box
                    style={{
                      alignItems: 'center',
                      gap: 15,
                    }}
                  >
                    <Text
                      style={{ fontSize: 20, fontWeight: 'bold' }}
                    >
                      Join the conversation
                    </Text>
                    <Input
                      variant="outline"
                      size="md"
                      isDisabled={false}
                      isInvalid={false}
                      isReadOnly={false}
                    >
                      <InputField placeholder="Enter your comment here" />
                    </Input>
                    <Button
                      bgColor="gray"
                      onPress={() => {
                        /* handle comment submission */
                      }}
                    >
                      <Text style={{ color: 'white' }}>Envoyer</Text>
                    </Button>
                  </Box>
                </Box>
              </Stack>
              {/* </Box> */}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Card>
      </Box>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <VStack>
                <Heading size="lg">Create Resource</Heading>
                <Text>
                  Fill in the details to create a new resource
                </Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="xl">
                <Input>
                  <InputField
                    placeholder="Enter resource title"
                    value={title}
                    onChange={e => console.log(e.target)}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Enter resource type"
                    value={type}
                    onChange={e => console.log(e.target)}
                  />
                </Input>
                <Select
                  onValueChange={handleValueChange}
                  placeholder="Select categories"
                >
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option" />
                    {/* <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                      </SelectIcon> */}
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Image" value="Image" />
                      <SelectItem label="Video" value="Video" />
                      <SelectItem label="Audio" value="Audio" />
                      <SelectItem label="Document" value="Document" />
                      <SelectItem label="Other" value="Other" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <Input>
                  <InputField
                    placeholder="Enter uploader ID"
                    value={uploader}
                    onChange={e => console.log(e.target)}
                  />
                </Input>
                <CheckboxGroup
                  value={[
                    isArchived ? 'isArchived' : '',
                    isFavorite ? 'isFavorite' : '',
                  ]}
                >
                  <Checkbox
                    value="isArchived"
                    isChecked={isArchived}
                    onChange={() => setIsArchived(!isArchived)}
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Archived</CheckboxLabel>
                  </Checkbox>
                  <Checkbox
                    value="isFavorite"
                    isChecked={isFavorite}
                    onChange={() => setIsFavorite(!isFavorite)}
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Favorite</CheckboxLabel>
                  </Checkbox>
                </CheckboxGroup>
              </VStack>
            </ModalBody>
            <ModalFooter borderTopWidth="$0">
              <VStack space="lg" w="$full">
                <Button onPress={handleModifyResource}>
                  <ButtonText>Submit</ButtonText>
                </Button>

                <Link href="/home/">
                  <Pressable
                    style={{
                      backgroundColor: 'red',
                      padding: 10,
                      borderRadius: 5,
                      width: '100%',
                      alignItems: 'center',
                    }}
                    onPress={async () => {
                      try {
                        await axios.delete(
                          `${BASE_URL}/api/resources/${id}`,
                        );
                        setShowModal(false);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    <Text style={{ color: 'white' }}>
                      Supprimer la ressource
                    </Text>
                  </Pressable>
                </Link>

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
      </Center>
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
  },
});
