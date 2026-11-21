import { Stack } from 'expo-router';
import { SistemaProvider } from '../data/sistema';

export default function Layout() {
  return (
    <SistemaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#F3F6FA',
          },
        }}
      />
    </SistemaProvider>
  );
}