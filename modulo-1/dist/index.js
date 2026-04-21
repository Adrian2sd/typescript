"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_utils_js_1 = require("./math-utils.js");
// Datos de prueba
const temperaturas = [22, 24, 21, 23, 25, 100, 22, 24, 21, 23];
const notas = [7, 8, 9, 6, 7, 8, 9, 10, 7, 8];
console.log("=== ANÁLISIS ESTADÍSTICO ===");
console.log("");
// Temperaturas
console.log("--- Temperaturas ---");
console.log(`Datos originales: [${temperaturas.join(", ")}]`);
console.log(`Media: ${(0, math_utils_js_1.calcularMedia)(temperaturas)}`);
console.log(`Mediana: ${(0, math_utils_js_1.calcularMediana)(temperaturas)}`);
console.log(`Sin atípicos: [${(0, math_utils_js_1.filtrarAtipicos)(temperaturas).join(", ")}]`);
console.log("");
// Notas
console.log("--- Notas de estudiantes ---");
console.log(`Datos originales: [${notas.join(", ")}]`);
console.log(`Media: ${(0, math_utils_js_1.calcularMedia)(notas)}`);
console.log(`Mediana: ${(0, math_utils_js_1.calcularMediana)(notas)}`);
console.log(`Sin atípicos: [${(0, math_utils_js_1.filtrarAtipicos)(notas).join(", ")}]`);
console.log("");
// Caso límite: array vacío
console.log("--- Caso límite: array vacío ---");
const vacio = [];
console.log(`Media: ${(0, math_utils_js_1.calcularMedia)(vacio)}`); // Debe mostrar null
console.log(`Mediana: ${(0, math_utils_js_1.calcularMediana)(vacio)}`); // Debe mostrar null
console.log(`Sin atípicos: [${(0, math_utils_js_1.filtrarAtipicos)(vacio)}]`); // Debe mostrar []
