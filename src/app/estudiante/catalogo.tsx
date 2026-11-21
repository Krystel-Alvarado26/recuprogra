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

export default function Catalogo() {
  const router = useRouter();
  const { equipos } = useSistema();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Catálogo de equipos</Text>
        <Text style={styles.subtitulo}>
          Consulta los equipos del laboratorio.
        </Text>
      </View>

      <View style={styles.contenido}>
        {equipos.map((equipo) => (
          <View key={equipo.id} style={styles.tarjeta}>
            <Text style={styles.imagen}>{equipo.imagen}</Text>

            <Text style={styles.nombre}>{equipo.nombre}</Text>

            <Text style={styles.descripcion}>{equipo.descripcion}</Text>

            <Text
              style={[
                styles.estado,
                {
                  color: equipo.disponibilidad ? '#16834A' : '#D14343',
                },
              ]}
            >
              {equipo.disponibilidad ? 'Disponible' : 'No disponible'}
            </Text>

            <TouchableOpacity
              style={[
                styles.boton,
                !equipo.disponibilidad && styles.botonDesactivado,
              ]}
              disabled={!equipo.disponibilidad}
              onPress={() =>
                router.push({
                  pathname: '/estudiante/solicitud',
                  params: {
                    id: equipo.id,
                    nombre: equipo.nombre,
                  },
                })
              }
            >
              <Text style={styles.textoBoton}>Solicitar préstamo</Text>
            </TouchableOpacity>
          </View>
        ))}

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
  titulo: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  subtitulo: { color: '#D8E3F0', marginTop: 8 },
  contenido: { padding: 20 },
  tarjeta: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 2,
  },
  imagen: { fontSize: 48, marginBottom: 10 },
  nombre: { fontSize: 19, fontWeight: 'bold', color: '#172B4D' },
  descripcion: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  estado: { fontWeight: 'bold', marginTop: 12 },
  boton: {
    backgroundColor: '#2456A6',
    padding: 13,
    borderRadius: 9,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  botonDesactivado: { backgroundColor: '#94A3B8' },
  textoBoton: { color: 'white', fontWeight: 'bold' },
  volver: { padding: 15, alignItems: 'center' },
  textoVolver: { color: '#2456A6', fontWeight: 'bold' },
});