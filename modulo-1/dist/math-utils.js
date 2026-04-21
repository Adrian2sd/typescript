"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularMedia = calcularMedia;
exports.calcularMediana = calcularMediana;
exports.filtrarAtipicos = filtrarAtipicos;
/**
 * Calcula la media aritmética de un array de números
 * @param numeros - Array de números
 * @returns La media o null si el array está vacío
 */
function calcularMedia(numeros) {
    if (numeros.length === 0) {
        return null;
    }
    const suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma / numeros.length;
}
/**
 * Calcula la mediana de un array de números
 * @param numeros - Array de números
 * @returns La mediana o null si el array está vacío
 */
function calcularMediana(numeros) {
    if (numeros.length === 0) {
        return null;
    }
    const copiaOrdenada = [...numeros].sort((a, b) => a - b);
    const mitad = Math.floor(copiaOrdenada.length / 2);
    if (copiaOrdenada.length % 2 === 0) {
        // Par: promedio de los dos valores centrales
        return (copiaOrdenada[mitad - 1] + copiaOrdenada[mitad]) / 2;
    }
    else {
        // Impar: valor central
        return copiaOrdenada[mitad];
    }
}
/**
 * Filtra valores atípicos (outliers) usando el método IQR
 * @param numeros - Array de números
 * @param limite - Factor multiplicador del IQR (por defecto 1.5)
 * @returns Array con valores filtrados
 */
function filtrarAtipicos(numeros, limite = 1.5) {
    if (numeros.length === 0) {
        return [];
    }
    const copiaOrdenada = [...numeros].sort((a, b) => a - b);
    // Calcular Q1 (primer cuartil) y Q3 (tercer cuartil)
    const q1 = calcularMediana(copiaOrdenada.slice(0, Math.floor(copiaOrdenada.length / 2)));
    const q3 = calcularMediana(copiaOrdenada.slice(Math.ceil(copiaOrdenada.length / 2)));
    if (q1 === null || q3 === null) {
        return numeros;
    }
    const iqr = q3 - q1;
    const limiteInferior = q1 - limite * iqr;
    const limiteSuperior = q3 + limite * iqr;
    return numeros.filter(num => num >= limiteInferior && num <= limiteSuperior);
}
