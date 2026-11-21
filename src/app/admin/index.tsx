import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSistema, Prestamo } from '../../data/sistema';

type VistaAdmin = 'solicitudes' | 'activos' | 'historial' | 'reportes';

export default function InicioAdministrador() {
  const router = useRouter();
  const { prestamos, cambiarEstadoPrestamo, cerrarSesion } = useSistema();

  const [vista, setVista] = useState<VistaAdmin>('solicitudes');

  const pendientes = prestamos.filter((p) => p.estado === 'Pendiente');
  const activos = prestamos.filter((p) => p.estado === 'Aprobado');

  // Conteo de solicitudes por equipo para el reporte de más solicitados
  const conteoPorEquipo = prestamos.reduce<Record<string, number>>((acc, item) => {
    acc[item.equipo] = (acc[item.equipo] || 0) + 1;
    return acc;
  }, {});

  const reporteOrdenado = Object.entries(conteoPorEquipo).sort(
    (a, b) => b[1] - a[1]
  );

  function manejarCerrarSesion() {
    cerrarSesion();
    router.replace('/');
  }

  function aprobar(prestamo: Prestamo) {
    cambiarEstadoPrestamo(prestamo.id, 'Aprobado');
    Alert.alert('Aprobado', `Préstamo de ${prestamo.equipo} aprobado.`);
  }

  function rechazar(prestamo: Prestamo) {
    cambiarEstadoPrestamo(prestamo.id, 'Rechazado');
    Alert.alert('Rechazado', `Solicitud de ${prestamo.equipo} rechazada.`);
  }

  function marcarDevuelto(prestamo: Prestamo) {
    cambiarEstadoPrestamo(prestamo.id, 'Devuelto');
    Alert.alert('Devuelto', `${prestamo.equipo} marcado como devuelto.`);
  }

  function colorEstado(estado: string) {
    if (estado === 'Pendiente') return '#E6A23C';
    if (estado === 'Aprobado') return '#16834A';
    if (estado === 'Rechazado') return '#D14343';
    return '#2456A6';
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icono}>🛠️</Text>
        <Text style={styles.titulo}>Panel de administrador</Text>
        <Text style={styles.subtitulo}>
          Gestión de equipos de laboratorio
        </Text>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.bienvenida}>¡Bienvenido, administrador!</Text>
        <Text style={styles.descripcion}>
          Selecciona una sección para administrar el sistema.
        </Text>

        {/* Menú de secciones */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={[
              styles.opcionMenu,
              vista === 'solicitudes' && styles.opcionActiva,
            ]}
            onPress={() => setVista('solicitudes')}
          >
            <Text
              style={[
                styles.textoMenu,
                vista === 'solicitudes' && styles.textoMenuActivo,
              ]}
            >
              Solicitudes ({pendientes.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcionMenu,
              vista === 'activos' && styles.opcionActiva,
            ]}
            onPress={() => setVista('activos')}
          >
            <Text
              style={[
                styles.textoMenu,
                vista === 'activos' && styles.textoMenuActivo,
              ]}
            >
              Activos ({activos.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcionMenu,
              vista === 'historial' && styles.opcionActiva,
            ]}
            onPress={() => setVista('historial')}
          >
            <Text
              style={[
                styles.textoMenu,
                vista === 'historial' && styles.textoMenuActivo,
              ]}
            >
              Historial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcionMenu,
              vista === 'reportes' && styles.opcionActiva,
            ]}
            onPress={() => setVista('reportes')}
          >
            <Text
              style={[
                styles.textoMenu,
                vista === 'reportes' && styles.textoMenuActivo,
              ]}
            >
              Reportes
            </Text>
          </TouchableOpacity>
        </View>

        {/* 1. SOLICITUDES PENDIENTES */}
        {vista === 'solicitudes' && (
          <View>
            {pendientes.length === 0 ? (
              <View style={styles.tarjetaVacia}>
                <Text style={styles.tituloVacio}>
                  No hay solicitudes pendientes
                </Text>
                <Text style={styles.textoVacio}>
                  Cuando un estudiante solicite un equipo, aparecerá aquí.
                </Text>
              </View>
            ) : (
              pendientes.map((item) => (
                <View key={item.id} style={styles.tarjeta}>
                  <Text style={styles.tarjetaTitulo}>{item.equipo}</Text>
                  <Text style={styles.tarjetaTexto}>
                    Estudiante: {item.usuarioNombre} ({item.usuarioCarnet})
                  </Text>
                  <Text style={styles.tarjetaTexto}>
                    Préstamo: {item.fechaPrestamo} | Devolución:{' '}
                    {item.fechaDevolucion}
                  </Text>
                  <Text
                    style={[
                      styles.estado,
                      { color: colorEstado(item.estado) },
                    ]}
                  >
                    Estado: {item.estado}
                  </Text>

                  <View style={styles.filaBotones}>
                    <TouchableOpacity
                      style={styles.botonAprobar}
                      onPress={() => aprobar(item)}
                    >
                      <Text style={styles.textoBotonBlanco}>Aprobar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botonRechazar}
                      onPress={() => rechazar(item)}
                    >
                      <Text style={styles.textoBotonBlanco}>Rechazar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* 2. PRÉSTAMOS ACTIVOS Y DEVOLUCIÓN */}
        {vista === 'activos' && (
          <View>
            {activos.length === 0 ? (
              <View style={styles.tarjetaVacia}>
                <Text style={styles.tituloVacio}>
                  No hay préstamos activos
                </Text>
                <Text style={styles.textoVacio}>
                  Los préstamos aprobados aparecerán aquí para controlar su
                  devolución.
                </Text>
              </View>
            ) : (
              activos.map((item) => (
                <View key={item.id} style={styles.tarjeta}>
                  <Text style={styles.tarjetaTitulo}>{item.equipo}</Text>
                  <Text style={styles.tarjetaTexto}>
                    Estudiante: {item.usuarioNombre} ({item.usuarioCarnet})
                  </Text>
                  <Text style={styles.tarjetaTexto}>
                    Préstamo: {item.fechaPrestamo} | Devolución:{' '}
                    {item.fechaDevolucion}
                  </Text>
                  <Text
                    style={[
                      styles.estado,
                      { color: colorEstado(item.estado) },
                    ]}
                  >
                    Estado: {item.estado}
                  </Text>

                  <TouchableOpacity
                    style={styles.botonDevolver}
                    onPress={() => marcarDevuelto(item)}
                  >
                    <Text style={styles.textoBotonBlanco}>
                      Marcar como devuelto
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        {/* 3. HISTORIAL DE PRÉSTAMOS */}
        {vista === 'historial' && (
          <View>
            {prestamos.length === 0 ? (
              <View style={styles.tarjetaVacia}>
                <Text style={styles.tituloVacio}>Sin historial aún</Text>
                <Text style={styles.textoVacio}>
                  Aquí se mostrará el historial completo de préstamos.
                </Text>
              </View>
            ) : (
              prestamos.map((item) => (
                <View key={item.id} style={styles.tarjeta}>
                  <Text style={styles.tarjetaTitulo}>{item.equipo}</Text>
                  <Text style={styles.tarjetaTexto}>
                    Estudiante: {item.usuarioNombre} ({item.usuarioCarnet})
                  </Text>
                  <Text style={styles.tarjetaTexto}>
                    Préstamo: {item.fechaPrestamo} | Devolución:{' '}
                    {item.fechaDevolucion}
                  </Text>
                  <Text
                    style={[
                      styles.estado,
                      { color: colorEstado(item.estado) },
                    ]}
                  >
                    Estado: {item.estado}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

        {/* 4. REPORTE DE EQUIPOS MÁS SOLICITADOS */}
        {vista === 'reportes' && (
          <View>
            {reporteOrdenado.length === 0 ? (
              <View style={styles.tarjetaVacia}>
                <Text style={styles.tituloVacio}>
                  No hay datos para el reporte
                </Text>
                <Text style={styles.textoVacio}>
                  Cuando se registren solicitudes, verás los equipos más
                  solicitados.
                </Text>
              </View>
            ) : (
              reporteOrdenado.map(([nombreEquipo, cantidad], index) => (
                <View key={nombreEquipo} style={styles.tarjeta}>
                  <Text style={styles.tarjetaTitulo}>
                    #{index + 1} — {nombreEquipo}
                  </Text>
                  <Text style={styles.tarjetaTexto}>
                    Total de solicitudes: {cantidad}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

        <TouchableOpacity style={styles.cerrar} onPress={manejarCerrarSesion}>
          <Text style={styles.cerrarTexto}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6FA' },
  header: {
    backgroundColor: '#172B4D',
    padding: 35,
    paddingTop: 55,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  icono: { fontSize: 45 },
  titulo: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitulo: { color: '#D8E3F0', marginTop: 8, textAlign: 'center' },
  contenido: { padding: 22 },
  bienvenida: { fontSize: 23, fontWeight: 'bold', color: '#172B4D' },
  descripcion: { color: '#64748B', marginTop: 8, marginBottom: 16 },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  opcionMenu: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  opcionActiva: {
    backgroundColor: '#2456A6',
    borderColor: '#2456A6',
  },
  textoMenu: { color: '#172B4D', fontWeight: 'bold', fontSize: 13 },
  textoMenuActivo: { color: 'white' },
  tarjeta: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
  },
  tarjetaVacia: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  tituloVacio: {
    color: '#172B4D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoVacio: {
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
  tarjetaTitulo: { color: '#172B4D', fontSize: 16, fontWeight: 'bold' },
  tarjetaTexto: { color: '#64748B', marginTop: 6 },
  estado: { fontWeight: 'bold', marginTop: 10 },
  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  botonAprobar: {
    flex: 1,
    backgroundColor: '#16834A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonRechazar: {
    flex: 1,
    backgroundColor: '#D14343',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonDevolver: {
    backgroundColor: '#2456A6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
  },
  textoBotonBlanco: { color: 'white', fontWeight: 'bold' },
  cerrar: {
    backgroundColor: '#DCE6F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  cerrarTexto: { color: '#2456A6', fontWeight: 'bold' },
});