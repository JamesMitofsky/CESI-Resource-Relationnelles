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
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [categoryType, setCategoryType] = useState([]);
  const [uploaderId, setUploaderId] = useState({
    uploader: { _id: '' },
  });
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/resources/${id}`,
        );
        const {
          title,
          type,
          categories,
          uploader,
          comments,
          isArchived,
          isFavorite,
        } = response.data;

        setResource(response.data);
        setTitle(title);
        setType(type);
        setCategories(categories);
        setCategoryType(
          categories.map(
            (category: { categoryType: string }) =>
              category.categoryType,
          ),
        );
        setUploaderId(uploader);
        setComments(comments);
        setIsArchived(isArchived);
        setIsFavorite(isFavorite);
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error(error);
      }
    };

    fetchResource();
  }, [id]);

  const handleModifyResource = async () => {
    const data = {
      title,
      type,
      categories: categories.map(category => ({
        categoryType: categoryType,
      })),
      uploader: { _id: uploaderId },
      comments,
      isArchived,
      isFavorite,
    };

    try {
      console.log('Data:', data); // Debugging
      console.log(JSON.stringify(data, null, 2));
      const response = await axios.put(
        `${BASE_URL}/api/resources/${id}`,
        data,
      );
      console.log('Resource modified:', response.data);
    } catch (error) {
      console.error('Failed to modify resource:', error);
    }
  };

  const handleCommentSubmit = async () => {
    const commentData = {
      content: comment,
      commenter: uploaderId,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/resources/${id}/comments`,
        commentData,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    Commentaires:
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
                      Rejoindre la conversation ! 🗨️
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Rajouter un commentaire"
                      value={comment}
                      onChangeText={setComment}
                    />
                    <Button
                      bgColor="gray"
                      onPress={handleCommentSubmit}
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
              <VStack alignItems="flex-start">
                <Button
                  variant="link"
                  size="sm"
                  onPress={() => setShowModal(false)}
                >
                  <ButtonIcon as={ArrowLeftIcon} />
                  <ButtonText>Retour</ButtonText>
                </Button>
                <Heading size="lg">Modifier cette ressource</Heading>
                <Text>
                  Renseigner tous les informations de la ressource
                </Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="sm">
                <Text>Le titre de la ressource?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={title}
                  onChangeText={setTitle}
                />
                <Text>Le contenu de la ressource?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type"
                  value={type}
                  onChangeText={setType}
                />
                <Text>Catégorie de la ressource?</Text>
                <Picker
                  selectedValue={categoryType}
                  style={styles.input}
                  onValueChange={(itemValue: any, itemIndex: any) =>
                    setCategoryType(itemValue)
                  }
                >
                  <Picker.Item label="Video" value="Video" />
                  <Picker.Item label="Audio" value="Audio" />
                  <Picker.Item label="Image" value="Image" />
                  <Picker.Item label="Document" value="Document" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>

                <CheckboxGroup
                  mb="$8"
                  value={[
                    isArchived ? 'isArchived' : '',
                    isFavorite ? 'isFavorite' : '',
                  ]}
                >
                  <Text>Archiver la ressource?</Text>
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
                  <Text>Ressource mise en avant?</Text>
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
              <VStack space="lg" w="$full" alignItems="center">
                <Link href="/home/">
                  <Pressable
                    onPress={handleModifyResource}
                    accessibilityLabel="Button to submit and modify a resource"
                    style={styles.button}
                  >
                    <Text>Confirmer la modification</Text>
                  </Pressable>
                </Link>
                <Text style={{ textAlign: 'center' }}>
                  Si vous souhaitez supprimer cette ressource cliquez
                  ci-dessous 👇
                </Text>
                <Link href="/home/">
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
