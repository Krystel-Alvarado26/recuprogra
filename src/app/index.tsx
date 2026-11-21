import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSistema } from '../data/sistema';

export default function InicioSesion() {
  const router = useRouter();
  const { login } = useSistema();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function iniciarSesion() {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Atención', 'Completa todos los campos.');
      return;
    }

    const resultado = await login(correo, contrasena);

    if (resultado === 'admin') {
      router.replace('../admin');
    } else if (resultado === 'estudiante') {
      router.replace('../estudiante');
    } else {
      Alert.alert(
        'Datos incorrectos',
        'Correo o contraseña no válidos. Puedes registrarte como estudiante o usar estudiante@lab.com / 123.'
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.encabezado}>
          <Text style={styles.icono}>🔬</Text>
          <Text style={styles.titulo}>Gestión de Equipos</Text>
          <Text style={styles.subtitulo}>Laboratorio Universitario</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.bienvenida}>¡Bienvenido!</Text>

          <Text style={styles.descripcion}>
            Ingresa tus datos para continuar.
          </Text>

          <Text style={styles.etiqueta}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.etiqueta}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
            <Text style={styles.textoBoton}>Iniciar sesión</Text>
          </TouchableOpacity>

          <View style={styles.registro}>
            <Text style={styles.textoRegistro}>¿No tienes una cuenta?</Text>

            <TouchableOpacity onPress={() => router.push('/registro')}>
              <Text style={styles.enlace}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.pie}>
          Sistema de Gestión de Equipos de Laboratorio
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FA' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 22 },
  encabezado: { alignItems: 'center', marginBottom: 35 },
  icono: { fontSize: 55, marginBottom: 10 },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#172B4D',
    textAlign: 'center',
  },
  subtitulo: { fontSize: 15, color: '#64748B', marginTop: 8 },
  formulario: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 18,
    elevation: 3,
  },
  bienvenida: { fontSize: 25, fontWeight: 'bold', color: '#172B4D' },
  descripcion: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 25,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#2456A6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  textoBoton: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  registro: { alignItems: 'center', marginTop: 22 },
  textoRegistro: { color: '#64748B', fontSize: 14 },
  enlace: {
    color: '#2456A6',
    fontWeight: 'bold',
    marginTop: 7,
    fontSize: 15,
  },
  pie: { textAlign: 'center', color: '#94A3B8', fontSize: 11, marginTop: 25 },
});