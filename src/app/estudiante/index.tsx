
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function InicioEstudiante() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icono}>🔬</Text>

        <Text style={styles.titulo}>
          Portal del estudiante
        </Text>

        <Text style={styles.subtitulo}>
          Sistema de préstamos de laboratorio
        </Text>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.bienvenida}>
          ¡Hola, estudiante!
        </Text>

        <Text style={styles.descripcion}>
          ¿Qué deseas hacer hoy?
        </Text>

        {/* Catálogo de equipos */}
        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => router.push('/estudiante/catalogo')}
        >
          <Text style={styles.tarjetaIcono}>💻</Text>

          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Catálogo de equipos
            </Text>

            <Text style={styles.tarjetaTexto}>
              Consulta los equipos disponibles.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Mis préstamos */}
        <TouchableOpacity
          style={styles.tarjeta}
        onPress={() => router.push('/estudiante/prestamos')}
        >
          <Text style={styles.tarjetaIcono}>📋</Text>

          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              
              Mis préstamos
            </Text>

            <Text style={styles.tarjetaTexto}>
              Consulta tus solicitudes y estados.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Mi perfil */}
        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => router.push('/estudiante/perfil')}
        >
          <Text style={styles.tarjetaIcono}>👤</Text>

          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Mi perfil
            </Text>

            <Text style={styles.tarjetaTexto}>
              Consulta tu información de estudiante.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={styles.cerrar}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.cerrarTexto}>
            Cerrar sesión
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
    padding: 35,
    paddingTop: 55,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },

  icono: {
    fontSize: 45,
  },

  titulo: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitulo: {
    color: '#D8E3F0',
    marginTop: 8,
  },

  contenido: {
    padding: 22,
  },

  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172B4D',
  },

  descripcion: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 20,
  },

  tarjeta: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  tarjetaIcono: {
    fontSize: 35,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  tarjetaTitulo: {
    color: '#172B4D',
    fontSize: 17,
    fontWeight: 'bold',
  },

  tarjetaTexto: {
    color: '#64748B',
    marginTop: 6,
  },

  cerrar: {
    backgroundColor: '#DCE6F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  cerrarTexto: {
    color: '#2456A6',
    fontWeight: 'bold',
  },
});