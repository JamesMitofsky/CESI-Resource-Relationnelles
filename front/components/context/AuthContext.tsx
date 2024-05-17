import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../../globals/port';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          setAuthState({
            token,
            authenticated: true,
          });

          axios.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
        } else {
          setAuthState({
            token: null,
            authenticated: false,
          });
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };
    checkToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${BASE_URL}/api/users`, {
        email,
        password,
      });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        {
          email,
          password,
        },
      );

      // rename values from response
      const result = response.data;
      const responseToken = result.token;

      console.log(result);

      setAuthState({
        token: responseToken,
        authenticated: true,
      });

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${responseToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, responseToken);

      return result;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      setAuthState({
        token: null,
        authenticated: false,
      });

      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
