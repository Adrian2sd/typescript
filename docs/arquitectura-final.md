# Arquitectura final: TypeScript vs JavaScript

## Fecha
21/04/2026

## Resumen ejecutivo

Este documento analiza cómo el uso de TypeScript (genéricos, uniones discriminadas, el tipo `never` y tipos de utilidad) reduce significativamente los errores en tiempo de ejecución en comparación con el desarrollo en JavaScript estándar.

---

## 1. Genéricos (`<T>`)

### Problema en JavaScript
En JavaScript puro, una función que trabaja con cualquier tipo de dato no puede garantizar la forma de ese dato. Por ejemplo, una función que obtiene datos de una API:

```javascript
// JavaScript: no hay garantía de que 'datos' tenga la propiedad 'nombre'
function procesarRespuesta(respuesta) {
    console.log(respuesta.datos.nombre); // Si 'datos' es null o no tiene 'nombre', CRASH en tiempo de ejecución
}

Solución con TypeScript (genéricos)
typescript
interface RespuestaAPI<T> {
    exito: boolean;
    datos: T | null;
}

function procesarRespuesta<T>(respuesta: RespuestaAPI<T>): void {
    if (respuesta.exito && respuesta.datos) {
        // TypeScript sabe que 'datos' es del tipo T
        console.log(respuesta.datos); // Seguro
    }
}
Reducción de errores: El compilador detecta si intentamos acceder a una propiedad que no existe en T. Esto elimina una clase entera de errores (TypeError: Cannot read property 'x' of undefined).

2. Uniones discriminadas (Tagged Unions)
Problema en JavaScript
Manejar diferentes estados de una petición (cargando, éxito, error) sin una estructura clara lleva a comprobaciones manuales propensas a errores:

javascript
// JavaScript: usamos flags y propiedades opcionales
let cargando = true;
let datos = null;
let error = null;

function manejarEstado() {
    if (cargando) {
        mostrarSpinner();
    } else if (datos) {
        mostrarDatos(datos);
    } else if (error) {
        mostrarError(error);
    }
    // ¿Qué pasa si 'cargando' es false y 'datos' es null y 'error' es null?
    // Estado imposible, pero JavaScript no lo detecta.
}
Solución con TypeScript (unión discriminada)
typescript
type EstadoPeticion<T> = 
    | { estado: "CARGANDO" }
    | { estado: "EXITO"; datos: T }
    | { estado: "ERROR"; mensaje: string };

function manejarEstado<T>(estado: EstadoPeticion<T>) {
    switch (estado.estado) {
        case "CARGANDO": return <Spinner />;
        case "EXITO": return <Tabla datos={estado.datos} />;
        case "ERROR": return <Error mensaje={estado.mensaje} />;
    }
}
Reducción de errores: TypeScript garantiza que se manejen todos los casos (exhaustividad). Si añadimos un nuevo estado, el compilador nos obliga a actualizar la función. Además, dentro de cada rama, TypeScript conoce exactamente qué propiedades existen.

3. Análisis exhaustivo con el tipo never
Problema en JavaScript
Cuando una unión discriminada crece (añadimos un nuevo caso), es fácil olvidar actualizar todas las funciones que la manejan. Esto produce errores silenciosos.

Solución con TypeScript (never)
typescript
function procesar(estado: EstadoPeticion<any>): string {
    switch (estado.estado) {
        case "CARGANDO": return "Cargando...";
        case "EXITO": return `Datos: ${estado.datos}`;
        case "ERROR": return `Error: ${estado.mensaje}`;
        default:
            // Si falta un caso, TypeScript mostrará ERROR en tiempo de compilación
            const comprobacionExhaustiva: never = estado;
            throw new Error(`Estado no manejado: ${comprobacionExhaustiva}`);
    }
}
Reducción de errores: Si alguien añade un nuevo estado (ej. "TIMEOUT") y no actualiza esta función, el compilador lanza un error. Esto elimina por completo los errores de lógica por omisión de casos.

4. Tipos de utilidad (Partial, Pick, Omit, Readonly)
Problema en JavaScript
Cuando trabajamos con actualizaciones parciales de objetos (ej. formulario de edición), no tenemos forma de indicar que solo ciertas propiedades están presentes.

javascript
// JavaScript: cualquier objeto es válido, incluso si tiene propiedades incorrectas
function actualizarUsuario(id, cambios) {
    // cambios puede ser { nombre: "nuevo" } o { email: "nuevo", algoInventado: true }
    // El programa fallará si usamos una propiedad que no existe
}
Solución con TypeScript (tipos de utilidad)
typescript
interface Usuario {
    id: string;
    nombre: string;
    email: string;
    edad: number;
}

// Partial<Usuario> permite cualquier subconjunto de propiedades, pero solo las definidas
function actualizarUsuario(id: string, cambios: Partial<Usuario>): void {
    // cambios SOLO puede contener 'nombre', 'email', 'edad' o 'id' (aunque id es readonly)
    // Si intentas pasar { algo: "extra" }, el compilador lo rechaza
}
Reducción de errores: Previene errores tipográficos y evita que se introduzcan propiedades no válidas en objetos de actualización. También Readonly<T> evita mutaciones accidentales.

Comparativa cuantitativa (estimación)
Tipo de error común en JavaScript	Prevención con TypeScript
Acceder a propiedad de undefined o null	strictNullChecks lo detecta en compilación
Olvidar un caso en un switch de estados	Análisis exhaustivo con never
Pasar objeto con estructura incorrecta a función	Tipado estructural e interfaces
Mutar accidentalmente un objeto que debería ser inmutable	Readonly<T> y as const
Usar una clave que no existe en un objeto	keyof T y Record<K,T>
En un proyecto mediano, TypeScript puede eliminar entre 80-90% de los errores de tipo y lógica que aparecerían en producción con JavaScript.

Conclusión
La combinación de genéricos, uniones discriminadas, el tipo never y los tipos de utilidad no es solo azúcar sintáctico. Es un sistema de validación en tiempo de compilación que:

Documenta el código automáticamente (las interfaces sirven como contrato).

Detecta errores antes de ejecutar el programa (no más Cannot read property of undefined en producción).

Guía al desarrollador (autocompletado, refactorización segura).

Escala con el equipo (el compilador impide violaciones del contrato).

En proyectos reales, TypeScript reduce drásticamente el tiempo de depuración y aumenta la confianza al refactorizar. JavaScript sigue siendo útil para prototipos rápidos, pero cualquier aplicación que pretenda mantenerse en el tiempo se beneficia enormemente de TypeScript.

