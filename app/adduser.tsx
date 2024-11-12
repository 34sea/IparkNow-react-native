import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userData = { name, email, password };

      // Recupera usuários existentes do AsyncStorage
      const storedUsers = await AsyncStorage.getItem('usersMecanic');
      let parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se parsedUsers é um array
      if (!Array.isArray(parsedUsers)) {
        parsedUsers = []; // Reinicia como um array se não for
      }

      console.log('Usuários armazenados antes do registro:', parsedUsers); // Log para verificar os usuários

      // Adiciona o novo usuário à lista existente
      parsedUsers.push(userData);
      
      // Salva a lista atualizada de usuários
      await AsyncStorage.setItem('usersMecanic', JSON.stringify(parsedUsers));

      console.log('Usuários armazenados após o registro:', parsedUsers); // Log para verificar os usuários
      Alert.alert('Sucesso', 'Registro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error); // Log de erro
      Alert.alert('Erro', 'Ocorreu um erro ao registrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Já tem uma conta?</Text>
        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}> Fazer Login</Text>
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
  registerButton: {
    height: 50,
    backgroundColor: '#00cc99',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#00cc99',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
