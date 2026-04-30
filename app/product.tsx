import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ProductCRUD() {
  const router = useRouter();

  // Estados para el producto
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState<{id: string, nombre: string, precio: string}[]>([]);

  // Función para agregar (Create)
  const agregarProducto = () => {
    if (nombreProducto.trim() && precio.trim()) {
      const nuevo = {
        id: Date.now().toString(),
        nombre: nombreProducto,
        precio: precio
      };
      setProductos([...productos, nuevo]);
      setNombreProducto(''); // Limpiar campos
      setPrecio('');
    }
  };

  // Función para eliminar (Delete)
  const eliminarProducto = (id: string) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para volver al index */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.title}>Gestión de Productos</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombreProducto}
          onChangeText={setNombreProducto}
        />

        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={agregarProducto}>
          <Text style={styles.buttonText}>Guardar Producto</Text>
        </Pressable>

        <Text style={styles.subtitle}>Inventario:</Text>

        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemPrice}>${item.precio}</Text>
              </View>
              <Pressable onPress={() => eliminarProducto(item.id)}>
                <Text style={styles.deleteText}>Eliminar</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={<Text style={{textAlign: 'center', color: '#999'}}>No hay productos</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20, paddingTop: 50 },
  backButton: { marginBottom: 10 },
  backText: { color: '#2196F3', fontSize: 16, fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 3, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemPrice: { fontSize: 14, color: '#666' },
  deleteText: { color: '#FF5252', fontWeight: 'bold' }
});