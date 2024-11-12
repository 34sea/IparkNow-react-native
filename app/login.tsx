import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

interface User {
  name: string;
  password: string;
}

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleLogin = async () => {
    if (name === 'root') {
      router.push('/homeAdmin'); // Redireciona para a tela de administrador
    }
    try {
      const storedUsers = await AsyncStorage.getItem('usersMecanic');
      const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se o usuário é admin ou comum
      const user = parsedUsers.find((user: User) => user.name === name && user.password === password);

      if (!user) {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
        return;
      }

      // Armazenar os dados do usuário logado
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ name: user.name }));

      if (name === 'admin') {
        router.push('/homeAdmin'); // Redireciona para a tela de administrador
      } else {
        router.push('/homeUser'); // Redireciona para a tela do usuário comum
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) de volta!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tens conta?</Text>
        <Link href={"/adduser"} style={styles.registerLink}>
          <Text>Criar</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#00cc99',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    left: "30%"
  },
  registerText: {
    fontSize: 16,
    color: '#555',
  },
  registerLink: {
    color: '#00cc99',
    fontWeight: '600',
    marginLeft: 5,
  },
});
