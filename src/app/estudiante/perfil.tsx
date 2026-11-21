
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Perfil() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi perfil</Text>
        <Text style={styles.subtitulo}>
          Información del estudiante
        </Text>
      </View>

      <View style={styles.contenido}>
        <View style={styles.foto}>
          <Text style={styles.icono}>👤</Text>
        </View>

        <Text style={styles.nombre}>
          Nombre del estudiante
        </Text>

        <Text style={styles.rol}>
          Estudiante
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>
            Nombre completo
          </Text>
          <Text style={styles.dato}>
            Nombre del estudiante
          </Text>

          <View style={styles.linea} />

          <Text style={styles.etiqueta}>
            Carnet universitario
          </Text>
          <Text style={styles.dato}>
            Pendiente de registrar
          </Text>

          <View style={styles.linea} />

          <Text style={styles.etiqueta}>
            Carrera
          </Text>
          <Text style={styles.dato}>
            Ingeniería en Sistemas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBoton}>
            Volver al inicio
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

  header: {
    backgroundColor: '#172B4D',
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#D8E3F0',
    marginTop: 8,
  },

  contenido: {
    padding: 22,
    alignItems: 'center',
  },

  foto: {
    backgroundColor: '#DCE6F5',
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  icono: {
    fontSize: 55,
  },

  nombre: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172B4D',
    marginTop: 15,
  },

  rol: {
    color: '#64748B',
    marginTop: 5,
  },

  tarjeta: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
    elevation: 2,
  },

  etiqueta: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 6,
  },

  dato: {
    color: '#172B4D',
    fontSize: 16,
    fontWeight: 'bold',
  },

  linea: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 18,
  },

  boton: {
    backgroundColor: '#2456A6',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },

  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});