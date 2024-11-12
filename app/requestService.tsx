import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Definição da interface para o serviço
interface Service {
  id: string;
  name: string;
  description: string;
  price: string; // Mantenha o preço como string
}

export default function RequestService() {
  const [userName, setUserName] = useState<string>(''); // Nome do usuário
  const [service, setService] = useState<Service | null>(null); // Para armazenar o serviço solicitado
  const router = useRouter();

  useEffect(() => {
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

    const loadRequest = async () => {
      try {
        const requests = await AsyncStorage.getItem('requests');
        const parsedRequests: any[] = requests ? JSON.parse(requests) : [];
        
        if (parsedRequests.length > 0) {
          const lastRequest = parsedRequests[parsedRequests.length - 1];
          // Aqui você deve carregar o serviço correspondente ao ID armazenado
          const storedServices = await AsyncStorage.getItem('services');
          const allServices: Service[] = storedServices ? JSON.parse(storedServices) : [];
          const requestedService = allServices.find((service) => service.id === lastRequest.serviceId);
          setService(requestedService || null); // Define o serviço solicitado
        } else {
          Alert.alert('Erro', 'Nenhum serviço solicitado encontrado.');
          router.back();
        }
      } catch (error) {
        console.error('Erro ao carregar a solicitação:', error);
      }
    };

    loadUserName();
    loadRequest();
  }, []);

  // Função para salvar a solicitação
  const handleRequestSubmit = async () => {
    router.push("/homeUser")
    // if (!service) {
    //   Alert.alert('Erro', 'Não há serviço para solicitar.');
    //   return;
    // }

    // try {
    //   const requests = await AsyncStorage.getItem('requests');
    //   const parsedRequests: any[] = requests ? JSON.parse(requests) : [];
      
    //   // Adiciona a nova solicitação
    //   parsedRequests.push({
    //     serviceId: service.id,
    //     serviceName: service.name,
    //     userName: userName,
    //     servicePrice: service.price,
    //   });

    //   // Salva as solicitações atualizadas no AsyncStorage
    //   await AsyncStorage.setItem('requests', JSON.stringify(parsedRequests));
    //   Alert.alert('Sucesso', 'Solicitação registrada com sucesso!');

    //   // Navegar de volta para a tela do usuário
    //   router.push('/homeUser'); // Substitua pela sua rota de tela de usuário
    // } catch (error) {
    //   console.error('Erro ao salvar a solicitação:', error);
    //   Alert.alert('Erro', 'Ocorreu um erro ao registrar a solicitação.');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requisição de Serviço</Text>
      <Text style={styles.userName}>Requerente: {userName}</Text> {/* Nome do usuário */}
      {service ? (
        <View>
          <Text style={styles.serviceName}>Serviço: {service.name}</Text>
          <Text style={styles.servicePrice}>Preço: {parseFloat(service.price).toFixed(2)}.MZN/hora</Text>
        </View>
      ) : (
        <Text style={styles.loading}>Carregando serviço...</Text>
      )}
      
      {/* <Button title="Solicitar Serviço" onPress={handleRequestSubmit} color="#00cc99" /> */}
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
  userName: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00cc99',
  },
  loading: {
    fontSize: 16,
    color: '#777',
  },
});
