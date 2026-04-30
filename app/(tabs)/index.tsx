import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Platform } from 'react-native';

// IMPORTACIÓN DE TUS CRUDs (Ajusta la ruta si es necesario)
import CustomerCRUD from '../customer';
import ProductCRUD from '../product';

const { width } = Dimensions.get('window');

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulo, setModulo] = useState('clientes'); // 'clientes' o 'productos'

  return (
    <View style={styles.container}>

      {/* --- HEADER NEGRO --- */}
      <View style={styles.header}>
        <Pressable onPress={() => setMenuOpen(true)} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {modulo === 'clientes' ? 'Gestión de Clientes' : 'Inventario Productos'}
        </Text>
      </View>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <View style={styles.content}>
        {modulo === 'clientes' ? (
          <CustomerCRUD />
        ) : (
          <ProductCRUD />
        )}
      </View>

      {/* --- MENÚ LATERAL DESPLEGABLE (EL NEGRO) --- */}
      {menuOpen && (
        <View style={styles.fullOverlay}>
          {/* Fondo oscuro para cerrar al tocar fuera */}
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />

          <View style={styles.sideMenu}>
            <Text style={styles.menuTitle}>Menú Principal</Text>

            <Pressable
              style={[styles.menuItem, modulo === 'clientes' && styles.menuItemActive]}
              onPress={() => { setModulo('clientes'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>👥 Clientes</Text>
            </Pressable>

            <Pressable
              style={[styles.menuItem, modulo === 'productos' && styles.menuItemActive]}
              onPress={() => { setModulo('productos'); setMenuOpen(false); }}
            >
              <Text style={styles.menuItemText}>📦 Productos</Text>
            </Pressable>

            <View style={styles.footerMenu}>
              <Pressable style={styles.closeButton} onPress={() => setMenuOpen(false)}>
                <Text style={styles.closeButtonText}>Cerrar Menú</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    height: Platform.OS === 'ios' ? 110 : 90,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', // Fondo negro puro
    paddingHorizontal: 20,
    elevation: 5,
  },
  menuButton: { padding: 5 },
  menuIcon: { fontSize: 28, color: 'white' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  content: { flex: 1 },

  // Estilos del Menú Desplegable
  fullOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)', // Oscurece el fondo
  },
  sideMenu: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: 'white',
    padding: 25,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  menuTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, color: '#1A1A1A' },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10
  },
  menuItemActive: { backgroundColor: '#E8F5E9' },
  menuItemText: { fontSize: 18, color: '#333', fontWeight: '500' },
  footerMenu: { marginTop: 'auto', marginBottom: 30 },
  closeButton: { padding: 15, alignItems: 'center', borderTopWidth: 1, borderColor: '#EEE' },
  closeButtonText: { color: '#FF5252', fontWeight: 'bold', fontSize: 16 }
});