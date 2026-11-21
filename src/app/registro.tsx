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
import { useSistema } from '../data/sistema';

const AVATARES = ['👩‍🎓', '👨‍🎓', '🧑‍💻', '👩‍🔬', '👨‍🔬'];

export default function Registro() {
  const router = useRouter();
  const { registrarEstudiante } = useSistema();

  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [carrera, setCarrera] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [foto, setFoto] = useState('👩‍🎓');

  async function registrar() {
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

    const res = await registrarEstudiante({
      nombre: nombre.trim(),
      carnet: carnet.trim(),
      carrera: carrera.trim(),
      correo: correo.trim().toLowerCase(),
      contrasena,
      foto,
    });

    if (!res.ok) {
      Alert.alert('Atención', res.mensaje || 'Error al registrar.');
      return;
    }

    Alert.alert(
      'Registro completado',
      'Tu cuenta fue creada en Supabase. Ahora puedes iniciar sesión.',
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
        <Text style={styles.icono}>{foto}</Text>

        <Text style={styles.titulo}>Registro de estudiante</Text>

        <Text style={styles.descripcion}>
          Completa tus datos para crear tu cuenta.
        </Text>

        <Text style={styles.etiqueta}>Foto / Avatar de perfil</Text>
        <View style={styles.filaAvatares}>
          {AVATARES.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.opcionAvatar,
                foto === item && styles.avatarSeleccionado,
              ]}
              onPress={() => setFoto(item)}
            >
              <Text style={styles.textoAvatar}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

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

        <TouchableOpacity style={styles.boton} onPress={registrar}>
          <Text style={styles.textoBoton}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FA' },
  contenido: { padding: 25, paddingTop: 45 },
  icono: { fontSize: 50, textAlign: 'center', marginBottom: 12 },
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
  filaAvatares: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  opcionAvatar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  avatarSeleccionado: {
    borderColor: '#2456A6',
    borderWidth: 2,
    backgroundColor: '#DCE6F5',
  },
  textoAvatar: { fontSize: 26 },
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
  textoBoton: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  volver: {
    color: '#2456A6',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
    fontWeight: 'bold',
  },
});