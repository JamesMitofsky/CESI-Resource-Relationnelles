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
import { jwtDecode } from 'jwt-decode';
import HeaderComponent from '../components/HeaderComponent';
import ReturnButtonComponent from '../components/ReturnButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // const token = localStorage.getItem('token');
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (decodedToken) {
      console.log(decodedToken.role);
    }
  }, [decodedToken]);

  // if (token) {
  //   decodedToken = jwtDecode(token);
  //   console.log(decodedToken.role);
  // }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${decodedToken}`,
          },
        });
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
            <HeaderComponent />
            <Box
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: 400,
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 24 }}>
                {!decodedToken
                  ? `Utilisateur non identifié. Veuillez vous connecter.`
                  : `Bienvenue ${decodedToken.name} | Votre role: ${decodedToken.role}`}
              </Text>
            </Box>
            <ReturnButtonComponent />
            {!decodedToken && (
              <Box
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 24 }}>
                  Accès réservé uniquement aux admins.
                </Text>
              </Box>
            )}
            {decodedToken &&
              users.map(user => (
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
