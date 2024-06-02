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
  Image,
} from '@gluestack-ui/themed';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const [categories, setCategories] = useState([]);
  const [uploader, setUploader] = useState('');
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

  const handleValueChange = (newValue: string) => {
    // if (Array.isArray(newValue)) {
    //   setCategories(newValue:);
    // } else {
    //   setCategories([newValue]);
    // }
  };

  const handleCreateResource = async () => {
    const data = {
      title: 'TEST Resource !!!',
      type: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt pharetra cursus. Nullam eget odio a dolor tempus commodo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ultricies, diam finibus pulvinar vehicula, lorem justo porta mi, eget bibendum dui velit eu quam. Nulla ultricies bibendum sapien id pellentesque. Integer non sapien eu libero laoreet venenatis in in velit. Suspendisse non cursus mauris. Aliquam ultrices, mauris sit amet malesuada tempor, erat ex pellentesque massa, a auctor felis lectus non ex. Etiam ut facilisis felis. Proin in sagittis tortor. Sed porttitor diam non dolor fringilla, vel tempus nulla porta. Maecenas convallis blandit nulla, quis consequat orci. Donec tincidunt pellentesque est, id porta nulla semper a. Suspendisse iaculis est sit amet magna venenatis, vitae elementum ante faucibus.

      Proin porttitor tempor lacus sit amet lobortis. Nullam ut lorem ut lectus volutpat maximus. Aenean vel lacinia nulla. Morbi vel metus a neque pretium placerat. Mauris nec enim imperdiet, malesuada sem sed, sollicitudin nisi. Fusce lobortis et nulla sit amet varius. Integer facilisis neque ultrices, tincidunt ipsum nec, tincidunt justo.'`,
      categories: { categoryType: 'Video' },
      uploader: { _id: '65cf5f1c21bf58f7b657b658' },
      comments: [
        {
          content:
            'Nullam ut lorem ut lectus volutpat maximus. Aenean vel lacinia nulla.',
          commenter: '65cf5f1c21bf58f7b657b658',
        },
        {
          content: 'Proin porttitor tempor lacus sit amet lobortis.',
          commenter: '65cf5f1c21bf58f7b657b658',
        },
        {
          content:
            'Proin porttitor tempor lacus sit amet lobortis.Nullam ut lorem ut lectus volutpat maximus. Aenean vel lacinia nulla.',
          commenter: '65cf5f1c21bf58f7b657b658',
        },
        {
          content:
            'Proin porttitor tempor lacus sit amet lobortis. Proin porttitor tempor lacus sit amet lobortis. Nullam ut lorem ut lectus volutpat maximus. Aenean vel lacinia nulla.',
          commenter: '65cf5f1c21bf58f7b657b658',
        },
      ],
      isArchived: false,
      isFavorite: false,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/resources`,
        data,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const isWeb = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Box
          style={{
            position: 'relative',
          }}
        >
          <Box>
            <HeaderComponent />
            <ReturnButtonComponent />
            <Box
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 16,
                margin: 42,
              }}
            >
              <Button onPress={getAllResources} style={styles.button}>
                <ButtonText>Tous les ressources</ButtonText>
              </Button>
              <Button
                onPress={getFavouriteResources}
                style={styles.button}
              >
                <ButtonText> Nos favoris </ButtonText>
              </Button>
            </Box>
            <Box
              style={
                isWeb ? styles.webContainer : styles.mobileContainer
              }
            >
              {resources.map(resource =>
                filter === 'all' ||
                filter ===
                  'favourites' /*&& resource.isFavourite*/ ? (
                  <Card key={resource._id} style={styles.card}>
                    <Text style={styles.title}>{resource.title}</Text>

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
                    <Text style={styles.categories}>
                      Categories:{' '}
                      {resource.categories
                        .map(c => c.categoryType)
                        .join(', ')}
                    </Text>

                    <Text style={styles.uploader}>
                      Uploader: {resource.uploader}
                    </Text>
                    <Text style={styles.status}>
                      Archived: {resource.isArchived ? 'Yes' : 'No'} |
                      Featured ❤️: {resource.isFavorite ? '🤩' : '😟'}
                    </Text>
                    <Text style={styles.categories}>
                      Comments: {resource.comments.length}
                    </Text>

                    <Link
                      href={{
                        pathname: `/home/resource/[id]`,
                        params: { id: resource._id },
                      }}
                      style={styles.linkButton}
                    >
                      <Text>Go to Resource</Text>
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
          >
            <ButtonText>Create Resource</ButtonText>
          </Button>
        </Box>
        <Center>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          >
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
                        <SelectItem
                          label="Document"
                          value="Document"
                        />
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
                  <Button onPress={handleCreateResource}>
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
    backgroundColor: '#020092',
  },
});
