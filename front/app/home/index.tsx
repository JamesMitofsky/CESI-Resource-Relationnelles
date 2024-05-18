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
} from '@gluestack-ui/themed';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { Card } from '@gluestack-ui/themed';
import { Resource } from '../../types/resource';
import { BASE_URL } from '../../globals/port';
import { useMediaQuery } from 'react-responsive';

export default function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [uploader, setUploader] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCreateResource = () => {
    // Handle resource creation logic here
    setShowModal(false);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/resources`);
        setResources(response.data);
        console.log('Resources:', response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const handleButtonClick = (id: string) => {
    // Handle button click here
    console.log('Button clicked for resource with ID:', id);
  };
  const handleValueChange = (newValue: string) => {
    // if (Array.isArray(newValue)) {
    //   setCategories(newValue:);
    // } else {
    //   setCategories([newValue]);
    // }
  };
  const isWeb = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={isWeb ? styles.webContainer : styles.mobileContainer}
      >
        {resources.map(resource => (
          <Card key={resource._id} style={styles.card}>
            <Text style={styles.title}>{resource.title}</Text>
            <Text style={styles.type}>{resource.type}</Text>
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
              Favorite: {resource.isFavorite ? 'Yes' : 'No'}
            </Text>
            <Button onPress={() => handleButtonClick(resource._id)}>
              <ButtonText>"Go to Resource"</ButtonText>
            </Button>
          </Card>
        ))}

        <Fab
          size="md"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          position="absolute"
        >
          <FabIcon as={AddIcon} mr="$1" />
          <FabLabel>Add a new resource</FabLabel>
        </Fab>

        <Center>
          <Button onPress={() => setShowModal(true)}>
            <ButtonText>Create Resource</ButtonText>
          </Button>

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
                    <Select.Item label="Image" value="Image" />
                    <Select.Item label="Video" value="Video" />
                    <Select.Item label="Audio" value="Audio" />
                    <Select.Item label="Document" value="Document" />
                    <Select.Item label="Other" value="Other" />
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
                      Archived
                    </Checkbox>
                    <Checkbox
                      value="isFavorite"
                      isChecked={isFavorite}
                      onChange={() => setIsFavorite(!isFavorite)}
                    >
                      Favorite
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
    justifyContent: 'space-between',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    flexBasis: '33%', // Adjust the percentage to fit your needs
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
});
