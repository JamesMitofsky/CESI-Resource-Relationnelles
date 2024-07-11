import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../globals/port';
import { Resource } from '../../types/resource';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
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
  Image,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
  Box,
} from '@gluestack-ui/themed';
import { useMediaQuery } from 'react-responsive';
import { BarChart } from 'react-native-chart-kit';
import HeaderComponent from '../../components/HeaderComponent';
import ReturnButtonComponent from '../../components/ReturnButtonComponent';

function StatisticsScreen() {
  const [mostCommented, setMostCommented] = useState<Resource[]>([]);
  const [mostVisited, setMostVisited] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(`${BASE_URL}/api/resources`);
      const sortedResources = response.data
        .sort(
          (a: any, b: any) => b.comments.length - a.comments.length,
        )
        .slice(0, 10);
      setMostCommented(sortedResources);
    };

    fetchResources();
  }, []);

  const chartData = {
    labels: mostCommented.map(resource => resource.title),
    datasets: [
      {
        data: mostCommented.map(resource => resource.comments.length),
      },
    ],
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width:720px)',
  });

  const Stack = isDesktopOrLaptop ? HStack : VStack;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Box>
        <HeaderComponent />
        <ReturnButtonComponent />

        <Stack>
          <Box
            style={{
              flex: 1,
              paddingRight: 10,
              gap: 20,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              Most Commented Resources
            </Text>
            <BarChart
              data={chartData}
              //   width={Dimensions.get('window').width - 42}
              width={600}
              height={400}
              yAxisLabel=""
              yAxisSuffix=""
              verticalLabelRotation={30}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) =>
                  `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginHorizontal: 'auto',
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Box>
          <Box
            style={{
              flex: 1,
              paddingRight: 10,
              gap: 20,
            }}
          >
            <Card>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}
              >
                Le top 10 liste de ressources les plus commentées
              </Text>
              {mostCommented.map((resource, index) => (
                <Box key={resource._id}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: 'slategray',
                    }}
                  >
                    {index + 1}. {resource.title}
                  </Text>
                  <Text style={{ fontSize: 16, paddingLeft: 20 }}>
                    {resource.comments.length} commentaire(s)
                  </Text>
                </Box>
              ))}
            </Card>
          </Box>
        </Stack>
      </Box>
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

export default StatisticsScreen;
