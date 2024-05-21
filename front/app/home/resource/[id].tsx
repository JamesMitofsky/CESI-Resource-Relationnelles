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
} from '@gluestack-ui/themed';
import { Resource } from '../../../types/resource';
import { BASE_URL } from '../../../globals/port';
import { useLocalSearchParams } from 'expo-router';

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

  return (
    <ScrollView style={styles.container}>
      <Card>
        {resource ? (
          <>
            <Text>{resource.title}</Text>
            <Text>Type: {resource.type}</Text>
            <Text>Uploader: {resource.uploader}</Text>
            <Text>
              Is Archived: {resource.isArchived ? 'Yes' : 'No'}
            </Text>
            <Text>
              Is Favorite: {resource.isFavorite ? 'Yes' : 'No'}
            </Text>
            <Text>Categories:</Text>
            {resource.categories.map((category, index) => (
              <Text key={index}>{category.categoryType}</Text>
            ))}
            <Text>Comments:</Text>
            {resource.comments.map(comment => (
              <Text key={comment._id}>
                {comment.content} - {comment.commenter}
              </Text>
            ))}
            <Button onPress={() => setShowModal(true)}>
              <ButtonText>Modify Resource</ButtonText>
            </Button>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
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
                  <Button onPress={handleModifyResource}>
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
      </Card>
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
});
