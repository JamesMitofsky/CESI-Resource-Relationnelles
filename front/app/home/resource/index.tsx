import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { Card } from '@gluestack-ui/themed';
import { Resource } from '../../../types/resource';

// scratchpad for resource page and type

export default function App() {
  const [resources, setResources] = useState<Resource[]>([]);

  const resource: Resource = {
    _id: '1',
    title: 'Resource 1',
    type: 'Video',
    categories: [
      { categoryType: 'Image' },
      { categoryType: 'Video' },
    ],
    uploader: 'Uploader 1',
    isArchived: false,
    isFavorite: false,
    comments: [
      { _id: '1', content: 'Comment 1', commenter: 'Commenter 1' },
    ],
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/resources/${resource._id}`,
        );
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text>{resource.title}</Text>
        <Card>
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
        </Card>
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
