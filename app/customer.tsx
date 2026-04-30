import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CustomerCRUD() {
  const [name, setName] = useState('');
  const [customers, setCustomers] = useState<{id: string, name: string}[]>([]);

  const addCustomer = () => {
    if (name.trim()) {
      setCustomers([...customers, { id: Date.now().toString(), name }]);
      setName('');
    }
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Clientes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        value={name}
        onChangeText={setName}
      />

      <Pressable style={styles.button} onPress={addCustomer}>
        <Text style={styles.buttonText}>Agregar Cliente</Text>
      </Pressable>

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Pressable onPress={() => deleteCustomer(item.id)}>
              <Text style={{color: 'red'}}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

// Aquí pegas los mismos estilos que ya tienes para que se vea igual
const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: 'white' },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', marginBottom: 5, borderRadius: 5 }
});