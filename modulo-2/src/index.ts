import type { Estudiante, Asignatura } from './domain/types/estudiante.types.js';
import type { EstadoMatricula, MatriculaActiva, MatriculaSuspendida, MatriculaFinalizada } from './domain/types/matricula.types.js';
import { generarReporte } from './domain/reportes/matricula.report.js';
import { obtenerRecurso, type RespuestaAPI } from './services/api-client.js';

console.log("=== MÓDULO 2: SISTEMA UNIVERSITARIO ===");
console.log("");

// ==================== PARTE 1: UNIÓN DISCRIMINADA ====================
console.log("--- UNIÓN DISCRIMINADA (EstadoMatricula) ---");

// Crear diferentes estados de matrícula
const matriculaActiva: MatriculaActiva = {
    tipo: "ACTIVA",
    asignaturas: [
        { id: "1", nombre: "TypeScript", codigo: "TS-101", creditos: 6, profesor: "Dr. Pérez" },
        { id: "2", nombre: "React", codigo: "RC-102", creditos: 6, profesor: "Dra. Gómez" }
    ],
    fechaInicio: new Date("2024-09-01")
};

const matriculaSuspendida: MatriculaSuspendida = {
    tipo: "SUSPENDIDA",
    motivo: "Bajo rendimiento académico",
    fechaSuspension: new Date("2024-12-15"),
    posibleReincorporacion: new Date("2025-09-01")
};

const matriculaFinalizada: MatriculaFinalizada = {
    tipo: "FINALIZADA",
    notaMedia: 8.5,
    fechaFinalizacion: new Date("2024-06-30"),
    certificadoEmitido: true
};

// Generar reportes
console.log("Reporte matrícula ACTIVA:", generarReporte(matriculaActiva));
console.log("Reporte matrícula SUSPENDIDA:", generarReporte(matriculaSuspendida));
console.log("Reporte matrícula FINALIZADA:", generarReporte(matriculaFinalizada));

console.log("");

// ==================== PARTE 2: SERVICIO DE DATOS GENÉRICO ====================
console.log("--- SERVICIO DE DATOS GENÉRICO ---");

async function probarServicioGenerico() {
    // Obtener un estudiante (tipado automáticamente)
    const respuestaEstudiante = await obtenerRecurso<Estudiante>("/api/estudiantes/1", 500);
    
    if (respuestaEstudiante.exito && respuestaEstudiante.datos) {
        console.log("✅ Estudiante obtenido:");
        console.log(`   Nombre: ${respuestaEstudiante.datos.nombreCompleto}`);
        console.log(`   Email: ${respuestaEstudiante.datos.email}`);
        console.log(`   Grado: ${respuestaEstudiante.datos.grado}`);
    } else {
        console.log("❌ Error al obtener estudiante:", respuestaEstudiante.error);
    }
    
    console.log("");
    
    // Obtener lista de asignaturas (tipado automáticamente)
    const respuestaAsignaturas = await obtenerRecurso<Asignatura[]>("/api/asignaturas", 500);
    
    if (respuestaAsignaturas.exito && respuestaAsignaturas.datos) {
        console.log("✅ Asignaturas obtenidas:");
        respuestaAsignaturas.datos.forEach(asig => {
            console.log(`   - ${asig.nombre} (${asig.codigo}) - ${asig.creditos} créditos`);
        });
    } else {
        console.log("❌ Error al obtener asignaturas:", respuestaAsignaturas.error);
    }
}

// Ejecutar la prueba asíncrona
probarServicioGenerico();

console.log("");
console.log("=== FIN DEL MÓDULO 2 ===");