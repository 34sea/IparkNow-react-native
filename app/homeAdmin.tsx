import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Service {
  id: string;
  name: string;
  price: string; // Adicionei o preço aqui, caso queira exibi-lo
}

const AdminScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [serviceCount, setServiceCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os serviços
        const storedServices = await AsyncStorage.getItem('services');
        const parsedServices: Service[] = storedServices ? JSON.parse(storedServices) : [];
        setServices(parsedServices);
        setServiceCount(parsedServices.length);

        // Busca os usuários
        const storedUsers = await AsyncStorage.getItem('usersMecanic');
        const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
        console.log('Usuários armazenados:', parsedUsers); // Log para verificar os usuários
        setUserCount(parsedUsers.length);
      } catch (error) {
        console.error('Erro ao buscar dados do AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const addService = () => {
    router.push('/servicos'); // Redirecionar para a tela de adição de serviços
  };

  const viewRequestedServices = () => {
    router.push('/RequestedServices'); // Navegar para a tela de serviços solicitados
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>Preço: {item.price} MT</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do admin</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Total de Slots: {serviceCount}</Text>
        <Text style={styles.statText}>Total de Usuários: {userCount}</Text>
      </View>

      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={addService}>
        <Text style={styles.addButtonText}>Slots</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.requestButton} onPress={viewRequestedServices}>
        <Text style={styles.requestButtonText}>Ver Slots Ocupados</Text>
      </TouchableOpacity>
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
    color: '#00cc99',
  },
  statsContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  statText: {
    fontSize: 18,
    color: '#333',
  },
  list: {
    marginVertical: 10,
  },
  serviceItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
  },
  servicePrice: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    height: 50,
    backgroundColor: '#00cc99',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  requestButton: {
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  requestButtonText: {
    color: '#00cc99',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
