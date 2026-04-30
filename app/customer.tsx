import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CustomerCRUD() {
  const [name, setName] = useState('');
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);

  const addCustomer = () => {
    if (name.trim()) {
      setCustomers([{ id: Date.now().toString(), name }, ...customers]);
      setName('');
    }
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* FORMULARIO */}
      <View style={styles.formCard}>
        <Text style={styles.label}>Nombre del Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Juan Pérez"
          value={name}
          onChangeText={setName}
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
          onPress={addCustomer}
        >
          <Text style={styles.buttonText}>Registrar Cliente</Text>
        </Pressable>
      </View>

      {/* LISTADO */}
      <Text style={styles.listTitle}>Lista de Clientes</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Pressable onPress={() => deleteCustomer(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay clientes registrados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA', // Un gris muy claro de fondo
  },
  formCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  deleteBtn: {
    padding: 5,
  },
  deleteText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#AAA',
  },
});