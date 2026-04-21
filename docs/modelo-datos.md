# Modelo de Datos - Sistema Universitario

## Decisiones arquitectónicas

### Interfaces vs Type Aliases

**Uso de interfaces (`interface`)** para:
- `Estudiante` - Entidad del dominio
- `Asignatura` - Entidad del dominio

**Uso de type aliases (`type`)** para:
- `EstadoMatricula` - Unión discriminada
- `RespuestaAPI<T>` - Tipo genérico

### Unión discriminada (Tagged Union)

La propiedad `tipo` actúa como discriminante, permitiendo a TypeScript estrechar automáticamente el tipo.

### Genéricos

`RespuestaAPI<T>` permite reutilizar la misma estructura para diferentes tipos de datos.

### Análisis exhaustivo con `never`

El bloque `default` en `generarReporte` asigna el valor a una variable de tipo `never`, forzando al compilador a verificar que se manejan todos los casos.