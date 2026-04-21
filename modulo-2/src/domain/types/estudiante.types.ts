/**
 * Interface para la entidad Estudiante
 * readonly: el ID no puede modificarse después de la creación
 */
export interface Estudiante {
    readonly id: string;
    nombreCompleto: string;
    email: string;
    fechaNacimiento: Date;
    grado: string;
    numeroExpediente: string;
}

/**
 * Interface para la entidad Asignatura
 */
export interface Asignatura {
    readonly id: string;
    nombre: string;
    codigo: string;
    creditos: number;
    profesor: string;
}