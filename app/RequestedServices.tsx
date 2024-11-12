import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const RequestedServices = () => {
  const [requestedServices, setRequestedServices] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRequestedServices = async () => {
      try {
        const storedRequests = await AsyncStorage.getItem('requests');
        const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
        setRequestedServices(parsedRequests);
      } catch (error) {
        console.error('Erro ao buscar serviços solicitados:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar os serviços solicitados.');
      }
    };

    fetchRequestedServices();
  }, []);

  const renderRequestItem = ({ item }: { item: any }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestServiceName}>Serviço: {item.serviceName}</Text>
      <Text style={styles.requestDetails}>ID do Serviço: {item.serviceId}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços Solicitados</Text>
      <FlatList
        data={requestedServices}
        renderItem={renderRequestItem}
        keyExtractor={(item, index) => `${item.serviceId}-${index}`} // Use a combinação do ID e índice
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  requestItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  requestServiceName: {
    fontSize: 16,
    color: '#333',
  },
  requestDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default RequestedServices;
