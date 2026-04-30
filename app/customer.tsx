import { View, Text, TextInput, Pressable, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

export default function CustomerCRUD() {
  const [name, setName] = useState('');
  const [customers, setCustomers] = useState<{id: string, name: string}[]>([]);

  const addCustomer = () => {
    if (name.trim()) {
      setCustomers([{ id: Date.now().toString(), name }, ...customers]); // Agrega al inicio
      setName('');
    }
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.mainTitle}>👥 Clientes</Text>

        {/* Sección de entrada */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Nuevo Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo..."
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]}
            onPress={addCustomer}
          >
            <Text style={styles.buttonText}>Añadir a la lista</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Registrados ({customers.length})</Text>

        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.customerCard}>
              <View style={styles.customerInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.customerName}>{item.name}</Text>
              </View>

              <Pressable
                onPress={() => deleteCustomer(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay clientes registrados aún.</Text>
            </View>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Sombra para Android
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginBottom: 15,
  },
  customerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  }
});