import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // Preço deve ser um número
}

export default function HomeUser() {
  const [services, setServices] = useState<Service[]>([]);
  const [userName, setUserName] = useState<string>(''); // Nome do usuário logado
  const router = useRouter();

  useEffect(() => {
    // Carregar serviços do AsyncStorage
    const loadServices = async () => {
      try {
        const storedServices = await AsyncStorage.getItem('services');
        const parsedServices: Service[] = storedServices ? JSON.parse(storedServices) : [];
        // Certifique-se de que o preço é um número
        const servicesWithNumberPrice = parsedServices.map(service => ({
          ...service,
          price: Number(service.price), // Converte o preço para número
        }));
        setServices(servicesWithNumberPrice);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar os serviços.');
      }
    };

    // Carregar o nome do usuário logado
    const loadUserName = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          setUserName(user.name); // Define o nome do usuário
        }
      } catch (error) {
        console.error('Erro ao carregar o nome do usuário:', error);
      }
    };

    loadServices();
    loadUserName();
  }, []);

  const handleServicePress = async (service: Service) => {
    // Salvar a solicitação no AsyncStorage
    try {
      const requests = await AsyncStorage.getItem('requests');
      const parsedRequests: any[] = requests ? JSON.parse(requests) : [];
      parsedRequests.push({ serviceId: service.id, serviceName: service.name });
      await AsyncStorage.setItem('requests', JSON.stringify(parsedRequests));

      // Navegar para a tela de solicitação
      router.push('/requestService');
    } catch (error) {
      console.error('Erro ao solicitar serviço:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao solicitar o serviço.');
    }
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceItem} onPress={() => handleServicePress(item)}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <Text style={styles.servicePrice}>Preço: {item.price.toFixed(2)}MZN/hora</Text> {/* Exibe o preço */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName}!</Text> {/* Nome do usuário */}
      <Text style={styles.subtitle}>Lista de Slots</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00cc99',
    marginTop: 5,
  },
});
