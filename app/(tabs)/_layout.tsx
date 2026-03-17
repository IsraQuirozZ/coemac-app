import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>

      <Tabs.Screen
        name="profile/index" 
        options={{
          href: null, // 👈 Esto oculta el icono de la barra de navegación inferior
          headerShown: false, // 👈 Esto quita el encabezado (header) de arriba
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false ,
          title: 'perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}

      />
      <Tabs.Screen
        name="referencias"
        options={{
          headerShown: false ,
          title: 'Referencias',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),  
        }}
      />
      
      <Tabs.Screen
        name="reuniones"
        options={{
          headerShown: false ,
          title: 'Reuniones',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="agradecimientos"
        options={{
          headerShown: false ,
          title: 'Agradecimientos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="incidencias"
        options={{
          headerShown: false ,
          title: 'Incidencias',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}