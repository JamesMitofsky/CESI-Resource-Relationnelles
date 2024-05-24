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
import { BASE_URL } from '../../globals/port';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'expo-router';
import { UserInterface } from '../../types/user';

export default function App() {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        setUsers(response.data);
        console.log('Users:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const isWeb = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Box
          style={{
            position: 'relative',
          }}
        >
          <Box
            style={
              isWeb ? styles.webContainer : styles.mobileContainer
            }
          >
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
                  source={require('../../assets/images/logo.png')}
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
            {users.map(user => (
              <Card key={user._id} style={styles.card}>
                <Text style={styles.title}>
                  Name:{user.name}
                  {''}
                  {user.firstName}
                </Text>
                <Text style={styles.uploader}>
                  Email: {user.email}
                </Text>
                <Text style={styles.status}>
                  Role: {user.role} | Account Status:{' '}
                  {user.accountStatus}
                </Text>
                <Link
                  href={{
                    pathname: `/admin/user/[id]`,
                    params: { id: user._id },
                  }}
                  style={styles.linkButton}
                >
                  <Text>See User Details</Text>
                </Link>
              </Card>
            ))}
          </Box>
        </Box>
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
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: '23%',
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
