import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSistema } from '../../data/sistema';

function formatearFecha(fecha: Date) {
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export default function Solicitud() {
  const router = useRouter();
  const { crearPrestamo } = useSistema();

  const { id, nombre } = useLocalSearchParams<{
    id: string;
    nombre: string;
  }>();

  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  function autocompletarTresDias() {
    const hoy = new Date();
    const enTresDias = new Date();
    enTresDias.setDate(hoy.getDate() + 3);
    setFechaPrestamo(formatearFecha(hoy));
    setFechaDevolucion(formatearFecha(enTresDias));
  }

  function solicitarPrestamo() {
    if (!id || !nombre) {
      Alert.alert('Atención', 'Selecciona un equipo desde el catálogo.');
      return;
    }

    if (fechaPrestamo.trim() === '' || fechaDevolucion.trim() === '') {
      Alert.alert('Atención', 'Completa las dos fechas.');
      return;
    }

    const prestamo = fechaPrestamo.split('/');
    const devolucion = fechaDevolucion.split('/');

    if (
      prestamo.length !== 3 ||
      devolucion.length !== 3 ||
      !prestamo.every((parte) => /^\d+$/.test(parte)) ||
      !devolucion.every((parte) => /^\d+$/.test(parte))
    ) {
      Alert.alert('Fechas incorrectas', 'Utiliza el formato DD/MM/AAAA.');
      return;
    }

    const fecha1 = new Date(
      Number(prestamo[2]),
      Number(prestamo[1]) - 1,
      Number(prestamo[0])
    );

    const fecha2 = new Date(
      Number(devolucion[2]),
      Number(devolucion[1]) - 1,
      Number(devolucion[0])
    );

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (
      fecha1.getDate() !== Number(prestamo[0]) ||
      fecha1.getMonth() !== Number(prestamo[1]) - 1 ||
      fecha1.getFullYear() !== Number(prestamo[2]) ||
      fecha2.getDate() !== Number(devolucion[0]) ||
      fecha2.getMonth() !== Number(devolucion[1]) - 1 ||
      fecha2.getFullYear() !== Number(devolucion[2])
    ) {
      Alert.alert('Error', 'Ingresa fechas válidas.');
      return;
    }

    if (fecha1 < fechaActual) {
      Alert.alert(
        'Error',
        'La fecha de préstamo no puede ser anterior a hoy.'
      );
      return;
    }

    if (fecha2 <= fecha1) {
      Alert.alert(
        'Error',
        'La devolución debe ser posterior al préstamo.'
      );
      return;
    }

    const creado = crearPrestamo(
      String(id),
      String(nombre),
      fechaPrestamo.trim(),
      fechaDevolucion.trim()
    );

    if (!creado) {
      Alert.alert('Atención', 'Inicia sesión como estudiante para solicitar.');
      return;
    }

    Alert.alert(
      'Solicitud enviada',
      'Tu préstamo quedó registrado con estado Pendiente.',
      [
        {
          text: 'Ver mis préstamos',
          onPress: () => router.replace('/estudiante/prestamos'),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contenido}>
        <Text style={styles.icono}>📋</Text>

        <Text style={styles.titulo}>Solicitar préstamo</Text>

        <Text style={styles.descripcion}>
          Completa los datos de tu solicitud.
        </Text>

        <Text style={styles.etiqueta}>Equipo seleccionado</Text>

        <View style={styles.equipo}>
          <Text style={styles.nombreEquipo}>
            {nombre || 'Equipo no seleccionado'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.atajo}
          onPress={autocompletarTresDias}
        >
          <Text style={styles.textoAtajo}>
            Usar hoy y devolución en 3 días
          </Text>
        </TouchableOpacity>

        <Text style={styles.etiqueta}>Fecha de préstamo</Text>

        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={fechaPrestamo}
          onChangeText={setFechaPrestamo}
        />

        <Text style={styles.etiqueta}>Fecha de devolución</Text>

        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={fechaDevolucion}
          onChangeText={setFechaDevolucion}
        />

        <TouchableOpacity style={styles.boton} onPress={solicitarPrestamo}>
          <Text style={styles.textoBoton}>Enviar solicitud</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.volver}
        >
          <Text style={styles.textoVolver}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FA' },
  contenido: { padding: 25, paddingTop: 45 },
  icono: { fontSize: 45, textAlign: 'center', marginBottom: 15 },
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
    marginBottom: 25,
  },
  etiqueta: {
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
    marginTop: 18,
  },
  equipo: {
    backgroundColor: '#DCE6F5',
    padding: 16,
    borderRadius: 10,
  },
  nombreEquipo: {
    color: '#172B4D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  atajo: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E8EEF7',
    alignItems: 'center',
  },
  textoAtajo: {
    color: '#2456A6',
    fontWeight: 'bold',
    fontSize: 13,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#2456A6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  volver: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoVolver: {
    color: '#2456A6',
    fontWeight: 'bold',
  },
});