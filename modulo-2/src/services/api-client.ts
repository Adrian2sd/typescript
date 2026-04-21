/**
 * Interfaz genérica para respuestas de API
 * T representa el tipo de datos que contiene la respuesta
 */
export interface RespuestaAPI<T> {
    exito: boolean;
    codigoEstado: number;
    datos: T | null;
    error?: string;
    timestamp: string;
}

/**
 * Simula una llamada a una API externa
 * @param endpoint - URL del recurso
 * @param delay - Tiempo de simulación en ms
 * @returns Promesa con la respuesta tipada
 */
export async function obtenerRecurso<T>(endpoint: string, delay: number = 1000): Promise<RespuestaAPI<T>> {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, delay));
    
    try {
        // Simular respuesta exitosa (en una API real sería fetch)
        const datosSimulados: T = await simularFetch<T>(endpoint);
        
        return {
            exito: true,
            codigoEstado: 200,
            datos: datosSimulados,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        return {
            exito: false,
            codigoEstado: 500,
            datos: null,
            error: error instanceof Error ? error.message : "Error desconocido",
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Simula la obtención de datos según el endpoint
 * En una API real, esto sería un fetch a la URL real
 */
async function simularFetch<T>(endpoint: string): Promise<T> {
    // Simular diferentes respuestas según el endpoint
    if (endpoint.includes("estudiantes")) {
        return {
            id: "EST-001",
            nombreCompleto: "Ana García",
            email: "ana.garcia@universidad.edu",
            fechaNacimiento: new Date("2000-05-15"),
            grado: "Ingeniería Informática",
            numeroExpediente: "EXP-2024-001"
        } as T;
    }
    
    if (endpoint.includes("asignaturas")) {
        return [
            { id: "ASIG-001", nombre: "TypeScript Avanzado", codigo: "TS-401", creditos: 6, profesor: "Dr. Martínez" },
            { id: "ASIG-002", nombre: "React con TypeScript", codigo: "RCT-402", creditos: 6, profesor: "Dra. López" }
        ] as T;
    }
    
    throw new Error(`Endpoint no reconocido: ${endpoint}`);
}