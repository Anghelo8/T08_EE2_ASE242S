import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Dashboard({ totalClientes, totalProductos }: { totalClientes: number, totalProductos: number }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido al Sistema!</Text>

      <View style={styles.statsRow}>
        {/* Tarjeta Clientes */}
        <View style={[styles.card, { borderLeftColor: '#4CAF50' }]}>
          <Text style={styles.cardTitle}>CLIENTES</Text>
          <Text style={styles.cardNumber}>{totalClientes}</Text>
          <Text style={styles.cardDesc}>Registrados</Text>
        </View>

        {/* Tarjeta Productos */}
        <View style={[styles.card, { borderLeftColor: '#2196F3' }]}>
          <Text style={styles.cardTitle}>PRODUCTOS</Text>
          <Text style={styles.cardNumber}>{totalProductos}</Text>
          <Text style={styles.cardDesc}>En Inventario</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Resumen de Actividad</Text>
        <Text style={styles.infoText}>• El sistema está sincronizado.</Text>
        <Text style={styles.infoText}>• No hay tareas pendientes para hoy.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6', padding: 20 },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 12, fontWeight: 'bold', color: '#666', letterSpacing: 1 },
  cardNumber: { fontSize: 32, fontWeight: '900', color: '#333', marginVertical: 5 },
  cardDesc: { fontSize: 12, color: '#999' },
  infoBox: { backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 2 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  infoText: { fontSize: 14, color: '#666', marginBottom: 5 }
});