import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Define a interface para o serviço
interface Service {
  id: string;
  name: string;
  price: string;
}

const ServiceScreen = () => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [services, setServices] = useState<Service[]>([]); // Define o tipo do estado como um array de Service
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      const storedServices = await AsyncStorage.getItem('services');
      const parsedServices: Service[] = storedServices ? JSON.parse(storedServices) : [];
      setServices(parsedServices);
    };

    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (serviceName.trim() === '' || servicePrice.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const price = parseFloat(servicePrice);
    if (isNaN(price) || price < 0) {
      Alert.alert('Erro', 'Por favor, insira um preço válido.');
      return;
    }

    const newService: Service = { id: Math.random().toString(), name: serviceName, price: price.toFixed(2) };

    const storedServices = await AsyncStorage.getItem('services');
    const parsedServices: Service[] = storedServices ? JSON.parse(storedServices) : [];
    const updatedServices = [...parsedServices, newService];

    await AsyncStorage.setItem('services', JSON.stringify(updatedServices));
    Alert.alert('Sucesso', 'Serviço adicionado com sucesso!');

    setServiceName('');
    setServicePrice('');
    setServices(updatedServices);

    router.push("/homeAdmin")
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>Preço: {item.price} MT/hora</Text>
    </View>
  );

  return (
    <View style={{width:"100%", height: "100%", display: "flex", alignItems:"center", justifyContent:"center", backgroundColor: "#f4f4f4"}}>
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar Slots</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#aaa"
          value={servicePrice}
          onChangeText={setServicePrice}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>Adicionar Serviço</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    backgroundColor: '#f4f4f4',
    width: "100%"
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    height: 50,
    backgroundColor: '#00cc99',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  list: {
    marginTop: 10,
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
});

export default ServiceScreen;
