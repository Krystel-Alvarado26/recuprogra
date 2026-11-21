
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

export default function InicioAdministrador() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icono}>🛠️</Text>
        <Text style={styles.titulo}>
          Panel de administrador
        </Text>
        <Text style={styles.subtitulo}>
          Gestión de equipos de laboratorio
        </Text>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.bienvenida}>
          ¡Bienvenido, administrador!
        </Text>

        <Text style={styles.descripcion}>
          Selecciona una opción para administrar el sistema.
        </Text>

        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => Alert.alert(
            'Solicitudes',
            'Aquí administraremos las solicitudes de préstamo.'
          )}
        >
          <Text style={styles.iconoTarjeta}>📋</Text>
          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Solicitudes de préstamo
            </Text>
            <Text style={styles.tarjetaTexto}>
              Aprobar o rechazar solicitudes.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => Alert.alert(
            'Préstamos activos',
            'Aquí consultaremos los préstamos activos.'
          )}
        >
          <Text style={styles.iconoTarjeta}>📦</Text>
          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Préstamos activos
            </Text>
            <Text style={styles.tarjetaTexto}>
              Consultar equipos prestados.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => Alert.alert(
            'Historial',
            'Aquí consultaremos los préstamos anteriores.'
          )}
        >
          <Text style={styles.iconoTarjeta}>📚</Text>
          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Historial de préstamos
            </Text>
            <Text style={styles.tarjetaTexto}>
              Revisar solicitudes anteriores.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => Alert.alert(
            'Reportes',
            'Aquí mostraremos los equipos más solicitados.'
          )}
        >
          <Text style={styles.iconoTarjeta}>📊</Text>
          <View style={styles.info}>
            <Text style={styles.tarjetaTitulo}>
              Reportes
            </Text>
            <Text style={styles.tarjetaTexto}>
              Consultar los equipos más solicitados.
            </Text>
          </View>
        </TouchableOpacity>

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
    textAlign: 'center',
  },

  subtitulo: {
    color: '#D8E3F0',
    marginTop: 8,
    textAlign: 'center',
  },

  contenido: {
    padding: 22,
  },

  bienvenida: {
    fontSize: 23,
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

  iconoTarjeta: {
    fontSize: 32,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  tarjetaTitulo: {
    color: '#172B4D',
    fontSize: 16,
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