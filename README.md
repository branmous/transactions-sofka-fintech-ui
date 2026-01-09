# transactions-sofka-fintech-ui

![Angular](https://img.shields.io/badge/Angular-21.0.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Este proyecto es una aplicación Angular UI para gestionar transacciones financieras. Aprovecha las modernas funciones de Angular, como los componentes independientes y el renderizado del lado del servidor (SSR), para ofrecer una experiencia de usuario rápida y receptiva.

## Requisitos de Sistema

Para ejecutar este proyecto, necesitas tener instalado:

*   **Node.js**: Versión `^20.x.x` o superior.
*   **Angular CLI**: Versión `21.0.5`.

Puedes verificar tus versiones con:

```bash
node -v
npm -v
ng version
```

## Instalación y Setup

Sigue estos pasos para configurar el proyecto localmente:

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd transactions-sofka-fintech-ui
    ```
2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

### Configuración de Entorno

Este proyecto no utiliza archivos de entorno (`environment.ts`) tradicionales para gestionar variables de entorno. La URL base de la API se encuentra directamente en el servicio `TransactionService`. Para configurar la URL de la API, edita el archivo `src/app/core/services/transaction.service.ts`.

## Scripts de Desarrollo

Estos son los comandos disponibles para el desarrollo del proyecto:

| Script                                      | Descripción                                                                 |
| :------------------------------------------ | :-------------------------------------------------------------------------- |
| `npm start` / `ng serve`                    | Levanta el servidor de desarrollo en `http://localhost:4200/`. Los cambios se recargan automáticamente. |
| `npm run build` / `ng build`                | Compila el proyecto para producción en la carpeta `dist/`.                 |
| `npm run watch`                             | Compila el proyecto en modo de observación, para recargas rápidas durante el desarrollo. |
| `npm test` / `ng test`                      | Ejecuta las pruebas unitarias del proyecto.                                 |
| `npm run serve:ssr:transactions-sofka-fintech-ui` | Levanta el servidor con Server-Side Rendering (SSR) habilitado. |

## Arquitectura y Estructura

El proyecto sigue una arquitectura modular y escalable, utilizando un enfoque híbrido que combina Standalone Components con NgModules para la gestión de características.

*   **Standalone Components**: La aplicación principal (`App` component) se arranca como un Standalone Component, aprovechando las últimas características de Angular para una mayor simplicidad y modularidad.
*   **Organización de Carpetas**:
    *   `src/app/core`: Contiene servicios singleton (como `TransactionService`), modelos, y otras utilidades que se utilizan en toda la aplicación.
        *   `src/app/core/models`: Define las interfaces de datos, como `Transaction.model.ts`.
        *   `src/app/core/services`: Aloja servicios que interactúan con la lógica de negocio o APIs.
        *   `src/app/core/interceptors`: (Actualmente vacío) Si se implementaran interceptores HTTP, residirían aquí.
    *   `src/app/shared`: (Actualmente vacío) Destinado a componentes, directivas o pipes reutilizables que no tienen una dependencia directa con una característica específica.
    *   `src/app/features`: Contiene módulos o componentes standalone que encapsulan funcionalidades específicas de la aplicación.
        *   `src/app/features/transactions`: Módulo lazy-loaded que maneja toda la lógica relacionada con las transacciones.
            *   `src/app/features/transactions/pages`: Componentes que representan páginas completas dentro de la característica (e.g., `TransactionDashboardComponent`).
            *   `src/app/features/transactions/components`: Componentes más pequeños y reutilizables dentro de la característica (e.g., `TransactionFormComponent`).

## Rutas Principales

El enrutamiento principal se define en `src/app/app.routes.ts`, y las rutas de las características se gestionan en sus respectivos módulos de enrutamiento.

| Ruta           | Carga                                            | Notas                                       |
| :------------- | :----------------------------------------------- | :------------------------------------------ |
| `/`            | Redirige a `/transactions`                       |                                             |
| `/transactions`| Módulo `TransactionsModule` (Lazy Loading)       | Muestra el `TransactionDashboardComponent`  |

## Consumo de API

El proyecto interactúa con una API backend para la gestión de transacciones.

*   **URL Base de la API**: `http://localhost:8080/api/v1/transactions`
*   **Servicios Principales**:
    *   `TransactionService` (`src/app/core/services/transaction.service.ts`): Encargado de realizar las operaciones CRUD para las transacciones (registro, obtención). Utiliza `HttpClient` de Angular para las solicitudes HTTP.

**Nota**: La URL de la API está hardcodeada en el `TransactionService`. Para entornos de producción, se recomienda externalizar esta configuración mediante archivos de entorno, variables de entorno del sistema o un servicio de configuración.