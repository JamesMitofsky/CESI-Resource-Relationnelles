import React, { useEffect, useState } from 'react';
import {
  AddIcon,
  ArrowLeftIcon,
  Box,
  Center,
  Checkbox,
  Fab,
  FabIcon,
  FabLabel,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
  ModalBackdrop,
  ButtonText,
  ModalContent,
  ModalHeader,
  ButtonIcon,
  CheckboxGroup,
  InputField,
  ModalBody,
  Modal,
  Button,
  ModalFooter,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  SelectItem,
  ChevronDownIcon,
  Icon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  Toast,
  ToastTitle,
  useToast,
  Image,
} from '@gluestack-ui/themed';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Card } from '@gluestack-ui/themed';
import { Resource } from '../../types/resource';
import { BASE_URL } from '../../globals/port';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'expo-router';
import HeaderComponent from '../components/HeaderComponent';
import ReturnButtonComponent from '../components/ReturnButtonComponent';

export default function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [categoryType, setCategoryType] = useState([]);
  const [uploaderId, setUploaderId] = useState(
    '65cf5f1c21bf58f7b657b658',
  );
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [filter, setFilter] = useState('all');

  const getAllResources = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/resources`);
      setResources(response.data);
      console.log('Resources:', response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };
  const getFavouriteResources = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/resources/favourites`,
    );
    setResources(response.data);
  };

  useEffect(() => {
    getAllResources();
  }, []);

  const toast = useToast();

  const handleSubmit = async () => {
    const data = {
      title,
      type,
      categories: { categoryType },
      uploader: { _id: uploaderId },
      comments,
      isArchived,
      isFavorite,
    };

    try {
      console.log('Data:', data); // Debugging
      console.log(JSON.stringify(data, null, 2));
      const response = await axios.post(
        `${BASE_URL}/api/resources`,
        data,
      );
      console.log('Resource created:', response.data);
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
                La création d'une ressource a reussi!
              </ToastTitle>
              <Link href="/">Retour</Link>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error('Failed to create resource:', error);
      toast.show({
        placement: 'bottom right',
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="error">
              <ToastTitle>
                La création d'une ressource a échoué.
              </ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const isWeb = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      aria-label="Conteneur principal"
    >
      <View aria-label="Vue principal">
        <Box
          style={{
            position: 'relative',
          }}
          aria-label="Boîte principale"
        >
          <Box aria-label="En-tête et boutons">
            <HeaderComponent />
            <ReturnButtonComponent />
            <Box
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 16,
                margin: 42,
              }}
              aria-label="Boutons de filtre"
            >
              <Button
                onPress={getAllResources}
                style={styles.button}
                aria-label="Bouton pour obtenir toutes les ressources"
              >
                <ButtonText>Toutes les ressources</ButtonText>
              </Button>
              <Button
                onPress={getFavouriteResources}
                style={styles.button}
                aria-label="Bouton pour obtenir les ressources favorites"
              >
                <ButtonText>Nos favoris</ButtonText>
              </Button>
            </Box>
            <Box
              style={
                isWeb ? styles.webContainer : styles.mobileContainer
              }
              aria-label="Conteneur de ressources"
            >
              {resources.map((resource, index) =>
                filter === 'all' || filter === 'favourites' ? (
                  <Card
                    key={index}
                    style={styles.card}
                    aria-label="Carte de ressource"
                  >
                    <Text
                      style={styles.title}
                      aria-label="Titre de la ressource"
                    >
                      {resource.title}
                    </Text>

                    {resource.categories.map(c => {
                      let imageUrl;
                      switch (c.categoryType) {
                        case 'Document':
                          imageUrl =
                            'https://fakeimg.pl/600x400/90c7bc/ffffff?text=Document';
                          break;
                        case 'Other':
                          imageUrl =
                            'https://fakeimg.pl/600x400?text=Autre';
                          break;
                        case 'Image':
                          imageUrl =
                            'https://fakeimg.pl/600x400/a492b0/ffffff?text=Image';
                          break;
                        case 'Video':
                          imageUrl =
                            'https://fakeimg.pl/600x400/e08686/ffffff?text=Vidéo';
                          break;
                        case 'Audio':
                          imageUrl =
                            'https://fakeimg.pl/600x400/dbd993/ffffff?text=Audio';
                          break;
                        default:
                          imageUrl =
                            'https://fakeimg.pl/600x400?text=Autre';
                      }
                      return (
                        <Image
                          source={{ uri: imageUrl }}
                          alt="Type de ressource Image"
                          style={{
                            width: 600,
                            height: 250,
                            borderRadius: 12,
                            marginTop: 12,
                          }}
                          aria-label="Image de type de ressource"
                        />
                      );
                    })}
                    <Text
                      style={styles.categories}
                      aria-label="Catégories de la ressource"
                    >
                      Catégories:{' '}
                      {resource.categories
                        .map(c => c.categoryType)
                        .join(', ')}
                    </Text>

                    <Text
                      style={styles.uploader}
                      aria-label="Téléverseur de la ressource"
                    >
                      Téléverseur: {resource.uploader}
                    </Text>
                    <Text
                      style={styles.status}
                      aria-label="Statut de la ressource"
                    >
                      Archivé: {resource.isArchived ? 'Oui' : 'Non'} |
                      En vedette ❤️:{' '}
                      {resource.isFavorite ? '🤩' : '😟'}
                    </Text>
                    <Text
                      style={styles.categories}
                      aria-label="Nombre de commentaires"
                    >
                      Commentaires: {resource.comments.length}
                    </Text>

                    <Link
                      href={{
                        pathname: `/home/resource/[id]`,
                        params: { id: resource._id },
                      }}
                      style={styles.linkButton}
                      aria-label="Lien vers la ressource"
                    >
                      <Text>Aller à la ressource</Text>
                    </Link>
                  </Card>
                ) : null,
              )}
            </Box>
          </Box>

          <Button
            onPress={() => setShowModal(true)}
            style={{
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              display: 'flex',
            }}
            aria-label="Bouton pour créer une ressource"
          >
            <ButtonText>Créer une ressource</ButtonText>
          </Button>
        </Box>
        <Center>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            aria-label="Modal pour créer une ressource"
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <VStack alignItems="flex-start">
                  <Button
                    variant="link"
                    size="sm"
                    onPress={() => setShowModal(false)}
                    aria-label="Bouton retour"
                  >
                    <ButtonIcon as={ArrowLeftIcon} />
                    <ButtonText>Retour</ButtonText>
                  </Button>
                  <Heading size="lg">Créer une ressource</Heading>
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
                    placeholder="Titre"
                    value={title}
                    onChangeText={setTitle}
                    aria-label="Entrée du titre"
                  />
                  <Text>Le contenu de la ressource?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contenu de la ressource"
                    value={type}
                    onChangeText={setType}
                    aria-label="Entrée du type"
                  />
                  <Text>Catégorie de la ressource?</Text>
                  <Picker
                    selectedValue={categoryType}
                    style={styles.input}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setCategoryType(itemValue)
                    }
                    aria-label="Sélecteur de catégorie"
                  >
                    <Picker.Item label="Vidéo" value="Video" />
                    <Picker.Item label="Audio" value="Audio" />
                    <Picker.Item label="Image" value="Image" />
                    <Picker.Item label="Document" value="Document" />
                    <Picker.Item label="Autre" value="Other" />
                  </Picker>

                  <CheckboxGroup
                    mb="$8"
                    value={[
                      isArchived ? 'isArchived' : '',
                      isFavorite ? 'isFavorite' : '',
                    ]}
                    aria-label="Groupe de cases à cocher"
                  >
                    <Text>Archiver la ressource?</Text>
                    <Checkbox
                      value="isArchived"
                      isChecked={isArchived}
                      onChange={() => setIsArchived(!isArchived)}
                      aria-label="Case à cocher pour archiver"
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>Archivé</CheckboxLabel>
                    </Checkbox>
                    <Text>Ressource mise en avant?</Text>
                    <Checkbox
                      value="isFavorite"
                      isChecked={isFavorite}
                      onChange={() => setIsFavorite(!isFavorite)}
                      aria-label="Case à cocher pour mettre en avant"
                    >
                      <CheckboxIndicator mr="$2">
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel>Favori</CheckboxLabel>
                    </Checkbox>
                  </CheckboxGroup>
                </VStack>
              </ModalBody>
              <ModalFooter borderTopWidth="$0">
                <VStack space="lg" w="$full">
                  <HStack space="xs" justifyContent="center">
                    <Link href="/home/">
                      <Pressable
                        onPress={handleSubmit}
                        accessibilityLabel="Bouton pour soumettre une nouvelle ressource"
                        style={styles.button}
                        aria-label="Bouton de soumission"
                      >
                        <Text>Créer votre ressource</Text>
                      </Pressable>
                    </Link>
                  </HStack>
                </VStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      </View>
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
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    flexBasis: '32%', // Adjust the percentage to fit your needs
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
