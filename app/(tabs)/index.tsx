import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulo, setModulo] = useState('clientes'); // Controla qué CRUD mostrar

  return (
    <View style={styles.container}>
      {/* --- HEADER PERSONALIZADO --- */}
      <View style={styles.header}>
        <Pressable onPress={() => setMenuOpen(true)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {modulo === 'clientes' ? 'Gestión de Clientes' : 'Inventario Productos'}
        </Text>
      </View>

      {/* --- CONTENIDO PRINCIPAL (Aquí cambias de CRUD) --- */}
      <View style={styles.content}>
        {modulo === 'clientes' ? (
          <Text>Aquí va tu código de CLIENTES</Text>
        ) : (
          <Text>Aquí va tu código de PRODUCTOS</Text>
        )}
      </View>

      {/* --- MENÚ LATERAL (OVERLAY) --- */}
      {menuOpen && (
        <Pressable
          style={styles.overlay}
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.sideMenu}>
            <Text style={styles.menuTitle}>Menú</Text>

            <Pressable
              style={styles.menuItem}
              onPress={() => { setModulo('clientes'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>👥 Clientes</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => { setModulo('productos'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>📦 Productos</Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, {marginTop: 20}]}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={{color: 'red'}}>Cerrar X</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 90,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15
  },
  menuButton: { padding: 10 },
  menuIcon: { fontSize: 24, color: 'white' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { flex: 1, padding: 20 },

  // Estilos del Menú Lateral Manual
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro transparente
    zIndex: 10,
  },
  sideMenu: {
    width: width * 0.7, // 70% de la pantalla
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  menuTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  menuItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuItemText: { fontSize: 18 }
});