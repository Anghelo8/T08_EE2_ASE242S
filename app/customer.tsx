import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export default function CustomerCRUD() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Función para verificar si el nombre tiene números
  const nameHasError = () => {
    const nameRegex = /[0-9]/; // Detecta si hay CUALQUIER número
    return nameRegex.test(name);
  };

  // Función para verificar si el teléfono tiene letras
  const phoneHasError = () => {
    const phoneRegex = /[^0-9]/; // Detecta si hay CUALQUIER cosa que NO sea número
    return phoneRegex.test(phone);
  };

  const addCustomer = () => {
    // Solo permite agregar si no hay errores y los campos obligatorios están llenos
    if (!nameHasError() && !phoneHasError() && name.trim() && phone.trim() && email.trim()) {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim()
      };
      setCustomers([newCustomer, ...customers]);
      setName(''); setPhone(''); setEmail(''); setAddress('');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.formCard}>
            <Text style={styles.title}>Nuevo Registro</Text>

            {/* CAMPO NOMBRE */}
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={[styles.input, nameHasError() && styles.inputError]}
              placeholder="Ej. Juan Perez"
              value={name}
              onChangeText={setName}
            />
            {nameHasError() && <Text style={styles.errorText}>⚠️ El nombre no debe contener números</Text>}

            {/* FILA TELÉFONO Y CORREO */}
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                  style={[styles.input, phoneHasError() && styles.inputError]}
                  placeholder="Solo números"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="numeric"
                />
                {phoneHasError() && <Text style={styles.errorText}>⚠️ Solo números</Text>}
              </View>

              <View style={{ flex: 1.5 }}>
                <Text style={styles.label}>Correo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* CAMPO DIRECCIÓN */}
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección de casa"
              value={address}
              onChangeText={setAddress}
            />

            <Pressable
              style={[styles.button, (nameHasError() || phoneHasError() || !name) && styles.buttonDisabled]}
              onPress={addCustomer}
              disabled={nameHasError() || phoneHasError() || !name}
            >
              <Text style={styles.buttonText}>Registrar Cliente</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>📞 {item.phone} | ✉️ {item.email}</Text>
              {item.address ? <Text style={styles.itemAddr}>📍 {item.address}</Text> : null}
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  formCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, elevation: 4, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 5 },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 15,
    marginBottom: 5
  },
  inputError: {
    borderColor: '#FF5252',
    backgroundColor: '#FFF5F5', // Fondo rosado suave si hay error
    borderWidth: 2
  },
  errorText: { color: '#FF5252', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 10 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#CCC' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  itemCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
    elevation: 2
  },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemSub: { fontSize: 13, color: '#666' },
  itemAddr: { fontSize: 12, color: '#999', marginTop: 5 }
});