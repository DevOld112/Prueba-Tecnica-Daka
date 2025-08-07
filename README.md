# Prueba Tecnica 

![Vue](https://img.shields.io/badge/Vue-3.5-green)
![Pinia](https://img.shields.io/badge/Pinia-3.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)
![Axios](https://img.shields.io/badge/Axios-1.11-lightgrey)

## 🚀 Instalación y Configuración

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git

# Navegar al directorio del proyecto
cd tu-proyecto

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Decisiones Técnicas Clave

### 🏗️ Arquitectura del Proyecto

1. **Pinia para Gestión de Estado**
   - Migración de Composables a Pinia para mejor escalabilidad
   - Ventajas:
     - DevTools integradas
     - Reactividad optimizada

2. **Stack Tecnológico**
   - **Vue 3** con Composition API
   - **Tailwind CSS v3** para estilos 
   - **Axios** para consumo de APIs
   - **VueAwesomePaginate** libreria para paginación
   - **VueSpinner** libreria para estados de carga

### 🎨 Diseño y UX

- **Filtro Flotante Moderno** en esquina inferior izquierda
- **Transiciones Animadas** entre páginas
- **Diseño Responsive** (Mobile First)
- **Persistencia** de favoritos en localStorage

## 📌 Características Principales

| Funcionalidad         | Implementación                     |
|-----------------------|------------------------------------|
| Filtros               | Client-side con reactividad        |
| Paginación            | VueAwesomePaginate                 |
| Manejo de Errores     | Interceptores Axios                |
| API                   | pyDolarVenezuela (tasa de cambio)  |
| Favoritos             | Persistencia en localStorage       |

## ⚠️ Contratiempos y Soluciones

**Problema:** 
- Bloqueo de API pyDolarVenezuela por exceso de peticiones (500+)

**Solución:**
1. Implementación de caché local
2. Uso temporal de API alternativa
3. Optimización de llamadas
4. Finalmente se migró a la API original con manejo adecuado

## 🌐 Demo en Vivo

🔗 [Ver Proyecto Desplegado](https://subtle-eclair-8e9149.netlify.app/)

## 🛠 Estructura del Proyecto

```
src/
├── assets/           # Estilos generales + tailwindcss
├── components/       # Componentes reutilizables
│   ├── ProductCard.vue
│   ├── Pagination.vue
│   └── ...
├── composables/      # Lógica reusable
├── stores/           # Stores de Pinia
│   └── productStore.ts
├── types/            # Tipos TypeScript
├── helpers/            # Utilidades
├── views/            # Vistas/páginas (Una sola vista)
└── main.ts           # Configuración principal
```



