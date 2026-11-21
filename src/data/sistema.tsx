import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

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
  equipos: Equipo[];
  prestamos: Prestamo[];
  cargarDatos: () => Promise<void>;
  registrarEstudiante: (
    datos: Omit<Estudiante, 'id'>
  ) => Promise<{ ok: boolean; mensaje?: string }>;
  login: (
    correo: string,
    contrasena: string
  ) => Promise<'admin' | 'estudiante' | 'error'>;
  cerrarSesion: () => void;
  crearPrestamo: (
    equipoId: string,
    equipoNombre: string,
    fechaPrestamo: string,
    fechaDevolucion: string
  ) => Promise<boolean>;
  cambiarEstadoPrestamo: (
    prestamoId: string,
    nuevoEstado: EstadoPrestamo
  ) => Promise<void>;
}

const SistemaContext = createContext<SistemaContextType | undefined>(undefined);

export function SistemaProvider({ children }: { children: React.ReactNode }) {
  const [rol, setRol] = useState<RolUsuario>(null);
  const [estudianteActual, setEstudianteActual] = useState<Estudiante | null>(null);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  async function cargarDatos() {
    const { data: eqData } = await supabase
      .from('equipos')
      .select('*')
      .order('nombre', { ascending: true });

    if (eqData) {
      setEquipos(eqData);
    }

    const { data: preData } = await supabase
      .from('prestamos')
      .select('*')
      .order('created_at', { ascending: false });

    if (preData) {
      const formateados: Prestamo[] = preData.map((p: any) => ({
        id: p.id,
        equipoId: p.equipo_id,
        equipo: p.equipo_nombre,
        usuarioCorreo: p.usuario_correo,
        usuarioNombre: p.usuario_nombre,
        usuarioCarnet: p.usuario_carnet,
        fechaPrestamo: p.fecha_prestamo,
        fechaDevolucion: p.fecha_devolucion,
        estado: p.estado,
      }));
      setPrestamos(formateados);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function registrarEstudiante(datos: Omit<Estudiante, 'id'>) {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        {
          nombre: datos.nombre,
          carnet: datos.carnet,
          carrera: datos.carrera,
          correo: datos.correo,
          contrasena: datos.contrasena,
          foto: datos.foto,
          rol: 'estudiante',
        },
      ])
      .select()
      .single();

    if (error || !data) {
      return {
        ok: false,
        mensaje: error?.message.includes('duplicate')
          ? 'Ese correo ya está registrado.'
          : 'No se pudo registrar el usuario.',
      };
    }

    setEstudianteActual(data);
    return { ok: true };
  }

  async function login(
    correo: string,
    contrasena: string
  ): Promise<'admin' | 'estudiante' | 'error'> {
    const correoLimpio = correo.trim().toLowerCase();

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correoLimpio)
      .eq('contrasena', contrasena)
      .maybeSingle();

    if (error || !data) {
      return 'error';
    }

    await cargarDatos();

    if (data.rol === 'admin') {
      setRol('admin');
      setEstudianteActual(null);
      return 'admin';
    }

    setRol('estudiante');
    setEstudianteActual(data);
    return 'estudiante';
  }

  function cerrarSesion() {
    setRol(null);
    setEstudianteActual(null);
  }

  async function crearPrestamo(
    equipoId: string,
    equipoNombre: string,
    fechaPrestamo: string,
    fechaDevolucion: string
  ) {
    if (!estudianteActual) return false;

    const { error } = await supabase.from('prestamos').insert([
      {
        equipo_id: equipoId,
        equipo_nombre: equipoNombre,
        usuario_id: estudianteActual.id,
        usuario_correo: estudianteActual.correo,
        usuario_nombre: estudianteActual.nombre,
        usuario_carnet: estudianteActual.carnet,
        fecha_prestamo: fechaPrestamo,
        fecha_devolucion: fechaDevolucion,
        estado: 'Pendiente',
      },
    ]);

    if (error) return false;

    await cargarDatos();
    return true;
  }

  async function cambiarEstadoPrestamo(
    prestamoId: string,
    nuevoEstado: EstadoPrestamo
  ) {
    const prestamoObjetivo = prestamos.find((p) => p.id === prestamoId);
    if (!prestamoObjetivo) return;

    const { error } = await supabase
      .from('prestamos')
      .update({ estado: nuevoEstado })
      .eq('id', prestamoId);

    if (error) return;

    if (nuevoEstado === 'Aprobado') {
      await supabase
        .from('equipos')
        .update({ disponibilidad: false })
        .eq('id', prestamoObjetivo.equipoId);
    } else if (nuevoEstado === 'Devuelto' || nuevoEstado === 'Rechazado') {
      await supabase
        .from('equipos')
        .update({ disponibilidad: true })
        .eq('id', prestamoObjetivo.equipoId);
    }

    await cargarDatos();
  }

  return (
    <SistemaContext.Provider
      value={{
        rol,
        estudianteActual,
        equipos,
        prestamos,
        cargarDatos,
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