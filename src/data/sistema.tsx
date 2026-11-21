import React, { createContext, useContext, useState } from 'react';
import { equipos as equiposIniciales } from './equipos';

export type EstadoPrestamo = 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Devuelto';

export interface Equipo {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  disponibilidad: boolean;
}

export interface Estudiante {
  id: string;
  nombre: string;
  carnet: string;
  carrera: string;
  correo: string;
  contrasena: string;
  foto: string;
}

export interface Prestamo {
  id: string;
  equipoId: string;
  equipo: string;
  usuarioCorreo: string;
  usuarioNombre: string;
  usuarioCarnet: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: EstadoPrestamo;
}

type RolUsuario = 'estudiante' | 'admin' | null;

interface SistemaContextType {
  rol: RolUsuario;
  estudianteActual: Estudiante | null;
  estudiantes: Estudiante[];
  equipos: Equipo[];
  prestamos: Prestamo[];
  registrarEstudiante: (datos: Omit<Estudiante, 'id'>) => void;
  login: (correo: string, contrasena: string) => 'admin' | 'estudiante' | 'error';
  cerrarSesion: () => void;
  crearPrestamo: (
    equipoId: string,
    equipoNombre: string,
    fechaPrestamo: string,
    fechaDevolucion: string
  ) => boolean;
  cambiarEstadoPrestamo: (prestamoId: string, nuevoEstado: EstadoPrestamo) => void;
}

const estudianteDemo: Estudiante = {
  id: 'est-1',
  nombre: 'Estudiante de Prueba',
  carnet: '0900-24-1234',
  carrera: 'Ingeniería en Sistemas',
  correo: 'estudiante@lab.com',
  contrasena: '123',
  foto: '👩‍🎓',
};

const SistemaContext = createContext<SistemaContextType | undefined>(undefined);

export function SistemaProvider({ children }: { children: React.ReactNode }) {
  const [rol, setRol] = useState<RolUsuario>(null);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([estudianteDemo]);
  const [estudianteActual, setEstudianteActual] = useState<Estudiante | null>(null);
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  function registrarEstudiante(datos: Omit<Estudiante, 'id'>) {
    const nuevo: Estudiante = {
      ...datos,
      id: `est-${Date.now()}`,
    };
    setEstudiantes((prev) => [...prev, nuevo]);
    setEstudianteActual(nuevo);
  }

  function login(correo: string, contrasena: string): 'admin' | 'estudiante' | 'error' {
    const correoLimpio = correo.trim().toLowerCase();

    if (correoLimpio === 'admin@lab.com' && contrasena === 'admin123') {
      setRol('admin');
      setEstudianteActual(null);
      return 'admin';
    }

    const encontrado = estudiantes.find(
      (est) => est.correo.toLowerCase() === correoLimpio && est.contrasena === contrasena
    );

    if (encontrado) {
      setRol('estudiante');
      setEstudianteActual(encontrado);
      return 'estudiante';
    }

    return 'error';
  }

  function cerrarSesion() {
    setRol(null);
    setEstudianteActual(null);
  }

  function crearPrestamo(
    equipoId: string,
    equipoNombre: string,
    fechaPrestamo: string,
    fechaDevolucion: string
  ) {
    if (!estudianteActual) return false;

    const nuevoPrestamo: Prestamo = {
      id: `pre-${Date.now()}`,
      equipoId,
      equipo: equipoNombre,
      usuarioCorreo: estudianteActual.correo,
      usuarioNombre: estudianteActual.nombre,
      usuarioCarnet: estudianteActual.carnet,
      fechaPrestamo,
      fechaDevolucion,
      estado: 'Pendiente',
    };

    setPrestamos((prev) => [nuevoPrestamo, ...prev]);
    return true;
  }

  function cambiarEstadoPrestamo(prestamoId: string, nuevoEstado: EstadoPrestamo) {
    setPrestamos((prev) =>
      prev.map((item) => {
        if (item.id !== prestamoId) return item;

        // Si se aprueba, el equipo pasa a no disponible; si se devuelve o rechaza, vuelve a estar disponible
        setEquipos((eqPrev) =>
          eqPrev.map((eq) => {
            if (eq.id !== item.equipoId) return eq;
            if (nuevoEstado === 'Aprobado') {
              return { ...eq, disponibilidad: false };
            }
            if (nuevoEstado === 'Devuelto' || nuevoEstado === 'Rechazado') {
              return { ...eq, disponibilidad: true };
            }
            return eq;
          })
        );

        return { ...item, estado: nuevoEstado };
      })
    );
  }

  return (
    <SistemaContext.Provider
      value={{
        rol,
        estudianteActual,
        estudiantes,
        equipos,
        prestamos,
        registrarEstudiante,
        login,
        cerrarSesion,
        crearPrestamo,
        cambiarEstadoPrestamo,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
}

export function useSistema() {
  const ctx = useContext(SistemaContext);
  if (!ctx) {
    throw new Error('useSistema debe usarse dentro de SistemaProvider');
  }
  return ctx;
}