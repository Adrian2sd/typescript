import type { EstadoMatricula } from '../types/matricula.types.js';

/**
 * Genera un reporte textual del estado de la matrícula
 * Utiliza el discriminante 'tipo' para estrechar el tipo automáticamente
 * 
 * IMPLEMENTA ANÁLISIS EXHAUSTIVO con el tipo 'never'
 * Si añadimos un nuevo estado, TypeScript nos obligará a actualizar esta función
 */
export function generarReporte(estado: EstadoMatricula): string {
    switch (estado.tipo) {
        case "ACTIVA":
            return `Matrícula ACTIVA - Cursando ${estado.asignaturas.length} asignaturas. Inicio: ${estado.fechaInicio.toLocaleDateString()}`;
        
        case "SUSPENDIDA":
            return `Matrícula SUSPENDIDA - Motivo: ${estado.motivo}. Suspensión: ${estado.fechaSuspension.toLocaleDateString()}`;
        
        case "FINALIZADA":
            return `Matrícula FINALIZADA - Nota media: ${estado.notaMedia}. Certificado: ${estado.certificadoEmitido ? "Sí" : "No"}`;
        
        default:
            // ✅ ANÁLISIS EXHAUSTIVO
            // Si añadimos un nuevo estado, TypeScript mostrará ERROR aquí
            const comprobacionExhaustiva: never = estado;
            throw new Error(`Estado de matrícula no manejado: ${comprobacionExhaustiva}`);
    }
}