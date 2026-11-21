
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Registro() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [carrera, setCarrera] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  function registrar() {
    if (
      nombre.trim() === '' ||
      carnet.trim() === '' ||
      carrera.trim() === '' ||
      correo.trim() === '' ||
      contrasena.trim() === ''
    ) {
      Alert.alert('Atención', 'Completa todos los campos.');
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert('Atención', 'Ingresa un correo válido.');
      return;
    }

    if (contrasena.length < 6) {
      Alert.alert(
        'Atención',
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    Alert.alert(
      'Registro completado',
      'El formulario está correcto. Próximamente guardaremos tus datos en Supabase.',
      [
        {
          text: 'Aceptar',
          onPress: () => router.replace('/'),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contenido}>
        <Text style={styles.icono}>👩‍🎓</Text>

        <Text style={styles.titulo}>
          Registro de estudiante
        </Text>

        <Text style={styles.descripcion}>
          Completa tus datos para crear tu cuenta.
        </Text>

        <Text style={styles.etiqueta}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.etiqueta}>Carné universitario</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de carné"
          value={carnet}
          onChangeText={setCarnet}
        />

        <Text style={styles.etiqueta}>Carrera</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Ingeniería en Sistemas"
          value={carrera}
          onChangeText={setCarrera}
        />

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
          placeholder="Mínimo 6 caracteres"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={registrar}
        >
          <Text style={styles.textoBoton}>
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  contenido: {
    padding: 25,
    paddingTop: 45,
  },

  icono: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#172B4D',
    textAlign: 'center',
  },

  descripcion: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  etiqueta: {
    color: '#334155',
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 7,
  },

  input: {
    backgroundColor: 'white',
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

  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  volver: {
    color: '#2456A6',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
    fontWeight: 'bold',
  },
});