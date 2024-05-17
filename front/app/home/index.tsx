import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import axios from 'axios';
import { Card } from '@gluestack-ui/themed';
import { Resource } from '../../types/resource';
import { BASE_URL } from '../../globals/port';

export default function App() {
  const [resources, setResources] = useState<Resource[]>([]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {resources.map(resource => (
        <Card key={resource._id} style={styles.card}>
          <Text style={styles.title}>{resource.title}</Text>
          <Text style={styles.type}>{resource.type}</Text>
          <Text style={styles.categories}>
            Categories:{' '}
            {resource.categories.map(c => c.categoryType).join(', ')}
          </Text>
          <Text style={styles.uploader}>
            Uploader: {resource.uploader}
          </Text>
          <Text style={styles.status}>
            Archived: {resource.isArchived ? 'Yes' : 'No'} | Favorite:{' '}
            {resource.isFavorite ? 'Yes' : 'No'}
          </Text>
          <Button
            title="Go to Resource"
            onPress={() => handleButtonClick(resource._id)}
          />
        </Card>
      ))}
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
    shadowOffset: { width: 0, height: 2 },
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
