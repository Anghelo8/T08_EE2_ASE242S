import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';

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

  // ESTADO PARA SABER SI ESTAMOS EDITANDO
  const [editingId, setEditingId] = useState<string | null>(null);

  const nameHasError = () => /[0-9]/.test(name);
  const phoneHasError = () => /[^0-9]/.test(phone);

  const handleSubmit = () => {
    if (!nameHasError() && !phoneHasError() && name.trim() && phone.trim()) {
      if (editingId) {
        // LÓGICA DE EDITAR
        setCustomers(customers.map(c =>
          c.id === editingId ? { ...c, name, phone, email, address } : c
        ));
        setEditingId(null);
      } else {
        // LÓGICA DE AGREGAR
        const newCustomer = { id: Date.now().toString(), name, phone, email, address };
        setCustomers([newCustomer, ...customers]);
      }
      // Limpiar campos
      setName(''); setPhone(''); setEmail(''); setAddress('');
    }
  };

  const deleteCustomer = (id: string) => {
    Alert.alert("Eliminar", "¿Estás seguro?", [
      { text: "No" },
      { text: "Sí", onPress: () => setCustomers(customers.filter(c => c.id !== id)) }
    ]);
  };

  const prepareEdit = (item: Customer) => {
    setEditingId(item.id);
    setName(item.name);
    setPhone(item.phone);
    setEmail(item.email);
    setAddress(item.address);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.formCard}>
            <Text style={styles.title}>{editingId ? 'Editando Cliente' : 'Nuevo Registro'}</Text>

            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={[styles.input, nameHasError() && styles.inputError]}
              placeholder="Ej. Juan Perez"
              value={name}
              onChangeText={setName}
            />
            {nameHasError() && <Text style={styles.errorText}>⚠️ El nombre no debe contener números</Text>}

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
                <TextInput style={styles.input} placeholder="correo@mail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              </View>
            </View>

            <Pressable
              style={[styles.button, (nameHasError() || phoneHasError() || !name) && styles.buttonDisabled, editingId && {backgroundColor: '#2196F3'}]}
              onPress={handleSubmit}
              disabled={nameHasError() || phoneHasError() || !name}
            >
              <Text style={styles.buttonText}>{editingId ? 'Actualizar Datos' : 'Registrar Cliente'}</Text>
            </Pressable>

            {editingId && (
              <Pressable style={{marginTop: 10}} onPress={() => {setEditingId(null); setName(''); setPhone(''); setEmail(''); setAddress('');}}>
                <Text style={{textAlign: 'center', color: '#666'}}>Cancelar Edición</Text>
              </Pressable>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Pressable style={{ flex: 1 }} onPress={() => prepareEdit(item)}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>📞 {item.phone} | ✉️ {item.email}</Text>
            </Pressable>

            <Pressable onPress={() => deleteCustomer(item.id)} style={styles.deleteBtn}>
              <Text style={{fontSize: 20}}>🗑️</Text>
            </Pressable>
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
  input: { backgroundColor: '#FAFAFA', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#DDD', fontSize: 15, marginBottom: 5 },
  inputError: { borderColor: '#FF5252', backgroundColor: '#FFF5F5', borderWidth: 2 },
  errorText: { color: '#FF5252', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 10 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#CCC' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  itemCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, borderLeftWidth: 6, borderLeftColor: '#4CAF50', elevation: 2, flexDirection: 'row', alignItems: 'center' },
  deleteBtn: { padding: 10, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemSub: { fontSize: 13, color: '#666' }
});