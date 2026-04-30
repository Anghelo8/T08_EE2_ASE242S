import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        drawerActiveTintColor: '#4CAF50',
        headerShown: true, // Esto muestra el botón "hamburguesa" para abrir el menú
      }}>
        <Drawer.Screen
          name="index" // Tu archivo index.tsx (Clientes)
          options={{
            drawerLabel: 'Clientes',
            title: 'Gestión de Clientes',
            drawerIcon: ({ color }) => <IconSymbol size={20} name="person.2.fill" color={color} />,
          }}
        />
        <Drawer.Screen
          name="explore" // Tu archivo explore.tsx (Productos)
          options={{
            drawerLabel: 'Productos',
            title: 'Inventario de Productos',
            drawerIcon: ({ color }) => <IconSymbol size={20} name="cart.fill" color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}