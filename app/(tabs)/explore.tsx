import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Gestión</Text>

      <Pressable style={styles.button} onPress={() => router.push('/customer')}>
        <Text style={styles.buttonText}>Ir a CRUD Clientes</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={() => router.push('/product')}>
        <Text style={styles.buttonText}>Ir a CRUD Productos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});