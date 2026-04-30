import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';

// IMPORTAMOS TUS ARCHIVOS ESPECÍFICOS
import CustomerCRUD from '../customer';
import ProductCRUD from '../product';

const { width } = Dimensions.get('window');

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulo, setModulo] = useState('clientes'); // Estado para saber qué mostrar

  return (
    <View style={styles.container}>

      {/* HEADER CON BOTÓN PARA EL MENÚ */}
      <View style={styles.header}>
        <Pressable onPress={() => setMenuOpen(true)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {modulo === 'clientes' ? 'Panel: Clientes' : 'Panel: Productos'}
        </Text>
      </View>

      {/* AQUÍ SE MUESTRA EL ARCHIVO CORRESPONDIENTE */}
      <View style={styles.content}>
        {modulo === 'clientes' ? (
          <CustomerCRUD />
        ) : (
          <ProductCRUD />
        )}
      </View>

      {/* MENÚ LATERAL (Sólo se ve si menuOpen es true) */}
      {menuOpen && (
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
          <View style={styles.sideMenu}>
            <Text style={styles.menuTitle}>Menú</Text>

            <Pressable
              style={[styles.menuItem, modulo === 'clientes' && styles.active]}
              onPress={() => { setModulo('clientes'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>👥 Gestión de Clientes</Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, modulo === 'productos' && styles.active]}
              onPress={() => { setModulo('productos'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>📦 Gestión de Productos</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 100,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
  },
  menuButton: { padding: 5 },
  menuIcon: { fontSize: 28, color: 'white' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { flex: 1 },

  // Estilos del Drawer Manual
  overlay: { position: 'absolute', width: '100%', height: '100%', zIndex: 100 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  sideMenu: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 60,
  },
  menuTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  menuItem: { padding: 15, borderRadius: 10, marginBottom: 10 },
  active: { backgroundColor: '#E8F5E9' },
  menuItemText: { fontSize: 16, color: '#333' }
});