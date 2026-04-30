import {
  View, Text, TextInput, Pressable, FlatList, StyleSheet
} from 'react-native';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProductosUltra() {

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const guardar = () => {
    if (!nombre || !tipo || !stock || !precio) {
      alert("Completa todos los campos");
      return;
    }

    if (editandoId) {
      const actualizados = productos.map(p =>
        p.id === editandoId ? { ...p, nombre, tipo, stock, precio } : p
      );
      setProductos(actualizados);
      setEditandoId(null);
    } else {
      const nuevo = {
        id: Date.now().toString(),
        nombre,
        tipo,
        stock,
        precio
      };
      setProductos([nuevo, ...productos]);
    }

    setNombre('');
    setTipo('');
    setStock('');
    setPrecio('');
  };

  const eliminar = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const editar = (p) => {
    setNombre(p.nombre);
    setTipo(p.tipo);
    setStock(p.stock);
    setPrecio(p.precio);
    setEditandoId(p.id);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>🍷 Panel Profesional</Text>

      {/* FORM ANIMADO */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.form}>
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input}/>
        <TextInput placeholder="Tipo" value={tipo} onChangeText={setTipo} style={styles.input}/>
        <TextInput placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" style={styles.input}/>
        <TextInput placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" style={styles.input}/>

        <Pressable style={styles.btnGuardar} onPress={guardar}>
          <Text style={styles.btnText}>
            {editandoId ? "Actualizar" : "Guardar"}
          </Text>
        </Pressable>
      </Animated.View>

      {/* HEADER TABLA */}
      <View style={styles.tableHeader}>
        <Text style={styles.th}>Nombre</Text>
        <Text style={styles.th}>Tipo</Text>
        <Text style={styles.th}>Stock</Text>
        <Text style={styles.th}>Precio</Text>
        <Text style={styles.th}>Acciones</Text>
      </View>

      {/* LISTA ANIMADA */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100)}
            style={styles.row}
          >
            <Text style={styles.td}>{item.nombre}</Text>
            <Text style={styles.td}>{item.tipo}</Text>
            <Text style={styles.td}>{item.stock}</Text>
            <Text style={styles.td}>S/ {item.precio}</Text>

            <View style={styles.actions}>
              <Pressable style={styles.edit} onPress={() => editar(item)}>
                <Text style={styles.actionText}>✏️</Text>
              </Pressable>

              <Pressable style={styles.delete} onPress={() => eliminar(item.id)}>
                <Text style={styles.actionText}>🗑</Text>
              </Pressable>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F4F8'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A1B2E'
  },

  form: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },

  btnGuardar: {
    backgroundColor: '#6A1B2E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6A1B2E',
    padding: 10,
    borderRadius: 6
  },

  th: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
    alignItems: 'center'
  },

  td: {
    flex: 1,
    fontSize: 12
  },

  actions: {
    flexDirection: 'row',
    gap: 5
  },

  edit: {
    backgroundColor: '#FFA000',
    padding: 6,
    borderRadius: 5
  },

  delete: {
    backgroundColor: '#D32F2F',
    padding: 6,
    borderRadius: 5
  },

  actionText: {
    color: 'white'
  }
});
