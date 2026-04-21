import type { Asignatura } from './estudiante.types.js';

/**
 * Interfaz para matrícula ACTIVA
 */
export interface MatriculaActiva {
    tipo: "ACTIVA";
    asignaturas: Asignatura[];
    fechaInicio: Date;
}

/**
 * Interfaz para matrícula SUSPENDIDA
 */
export interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivo: string;
    fechaSuspension: Date;
    posibleReincorporacion?: Date;
}

/**
 * Interfaz para matrícula FINALIZADA
 */
export interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
    fechaFinalizacion: Date;
    certificadoEmitido: boolean;
}

/**
 * Unión discriminada de estados de matrícula
 * La propiedad 'tipo' actúa como discriminante
 */
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;