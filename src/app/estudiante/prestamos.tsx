import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSistema } from '../../data/sistema';

export default function Prestamos() {
  const router = useRouter();
  const { prestamos, estudianteActual } = useSistema();

  const misPrestamos = estudianteActual
    ? prestamos.filter((p) => p.usuarioCorreo === estudianteActual.correo)
    : [];

  function colorEstado(estado: string) {
    if (estado === 'Pendiente') return '#E6A23C';
    if (estado === 'Aprobado') return '#16834A';
    if (estado === 'Rechazado') return '#D14343';
    return '#2456A6';
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis préstamos</Text>
        <Text style={styles.subtitulo}>
          Consulta el estado de tus solicitudes.
        </Text>
      </View>

      <View style={styles.contenido}>
        {misPrestamos.length === 0 ? (
          <View style={styles.vacio}>
            <Text style={styles.icono}>📋</Text>

            <Text style={styles.mensaje}>
              No tienes préstamos registrados.
            </Text>

            <Text style={styles.descripcion}>
              Cuando realices una solicitud, podrás consultar aquí su estado y
              sus fechas.
            </Text>

            <TouchableOpacity
              style={styles.boton}
              onPress={() => router.push('/estudiante/catalogo')}
            >
              <Text style={styles.textoBoton}>Ver catálogo de equipos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          misPrestamos.map((prestamo) => (
            <View key={prestamo.id} style={styles.tarjeta}>
              <Text style={styles.nombre}>{prestamo.equipo}</Text>

              <Text style={styles.dato}>
                Fecha de préstamo: {prestamo.fechaPrestamo}
              </Text>

              <Text style={styles.dato}>
                Fecha de devolución: {prestamo.fechaDevolucion}
              </Text>

              <Text
                style={[
                  styles.estado,
                  { color: colorEstado(prestamo.estado) },
                ]}
              >
                Estado: {prestamo.estado}
              </Text>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.volver} onPress={() => router.back()}>
          <Text style={styles.textoVolver}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FA' },
  header: {
    backgroundColor: '#172B4D',
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titulo: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  subtitulo: { color: '#D8E3F0', marginTop: 8 },
  contenido: { padding: 22 },
  vacio: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
    elevation: 2,
  },
  icono: { fontSize: 50, marginBottom: 15 },
  mensaje: {
    color: '#172B4D',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descripcion: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: '#2456A6',
    padding: 15,
    borderRadius: 10,
    marginTop: 22,
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: { color: 'white', fontWeight: 'bold' },
  tarjeta: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },
  nombre: {
    color: '#172B4D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dato: { color: '#64748B', marginTop: 7 },
  estado: { fontWeight: 'bold', marginTop: 15 },
  volver: { padding: 15, alignItems: 'center', marginTop: 15 },
  textoVolver: { color: '#2456A6', fontWeight: 'bold' },
});