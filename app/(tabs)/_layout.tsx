import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Usamos Stack con headerShown: false para que NO
          se cree ningún menú automático arriba y mande tu index.tsx
      */}
      <Stack.Screen name="index" />
    </Stack>
  );
}