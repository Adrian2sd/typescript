import { calcularMedia, calcularMediana, filtrarAtipicos } from './math-utils.js';

// Datos de prueba
const temperaturas: number[] = [22, 24, 21, 23, 25, 100, 22, 24, 21, 23];
const notas: number[] = [7, 8, 9, 6, 7, 8, 9, 10, 7, 8];

console.log("=== ANÁLISIS ESTADÍSTICO ===");
console.log("");

// Temperaturas
console.log("--- Temperaturas ---");
console.log(`Datos originales: [${temperaturas.join(", ")}]`);
console.log(`Media: ${calcularMedia(temperaturas)}`);
console.log(`Mediana: ${calcularMediana(temperaturas)}`);
console.log(`Sin atípicos: [${filtrarAtipicos(temperaturas).join(", ")}]`);

console.log("");

// Notas
console.log("--- Notas de estudiantes ---");
console.log(`Datos originales: [${notas.join(", ")}]`);
console.log(`Media: ${calcularMedia(notas)}`);
console.log(`Mediana: ${calcularMediana(notas)}`);
console.log(`Sin atípicos: [${filtrarAtipicos(notas).join(", ")}]`);

console.log("");

// Caso límite: array vacío
console.log("--- Caso límite: array vacío ---");
const vacio: number[] = [];
console.log(`Media: ${calcularMedia(vacio)}`); // Debe mostrar null
console.log(`Mediana: ${calcularMediana(vacio)}`); // Debe mostrar null
console.log(`Sin atípicos: [${filtrarAtipicos(vacio)}]`); // Debe mostrar []