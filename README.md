# 🎵 PROYECTO CONCIERTOS - Infernal Management

Sistema de gestión y venta de entradas para conciertos con panel administrativo y vista pública. Desarrollado únicamente con HTML, CSS y JavaScript (sin frameworks).

## ✨ Características

### 🌐 Vista Pública (`index.html`)
- Exploración de eventos con tarjetas visuales (imagen, categoría, precio, fecha, ciudad)
- Búsqueda por nombre y filtros por categoría y ciudad
- Carrito de compras lateral con total y eliminación de items
- Proceso de checkout con formulario de datos del comprador
- Formulario de contacto con almacenamiento local
- Componente web personalizado `<evento-card>`

### 🔐 Panel Administrativo (`admin/`)
- **Autenticación**: Login con credenciales fijas y sesión en localStorage
- **Dashboard**: Métricas en tiempo real (conteo de categorías, eventos, ventas, ingresos) + reloj en vivo
- **CRUD de Categorías**: Crear, editar, eliminar categorías (eliminación en cascada de eventos asociados)
- **CRUD de Eventos**: Formulario completo con selector dinámico de país → ciudad, fecha, hora, precio, imagen
- **Gestión de Ventas**: Tabla de ventas ordenadas por fecha con detalle por compra
- **Buzón de Mensajes**: Visualización de mensajes del formulario de contacto
- **Exportar Datos**: Descarga de respaldo JSON con todas las categorías, países, eventos, ventas y contactos
- **Navegación**: Arquitectura SPA en `eventos.html` + páginas independientes para Dashboard, Categorías y Reportes

## 🛠️ Tecnologías

- **HTML5** semántico
- **CSS3** con tema oscuro "Infernal" (variables CSS, glassmorphism, animaciones)
- **JavaScript** vanilla (ES6+)
- **localStorage** para persistencia de datos
- **Custom Elements** (Web Components) para tarjetas de eventos
- **Responsive Design** con `responsive.css`

## 🚀 Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd PROYECTO_CONCIERTOS_ALVARO_JAVIER
   ```

2. Abre `index.html` en tu navegador para la vista pública.

3. Accede al panel admin:
   - Ve a `admin/admin.html` o haz clic en "Administración" en el header
   - **Email:** `admin@gmail.com`
   - **Contraseña:** `123456`

> No requiere servidor ni dependencias externas. Todo funciona directamente en el navegador.

## 📁 Estructura del Proyecto

```
Aquí tienes la estructura de carpetas actualizada en formato de texto, reflejando exactamente el orden de los archivos y carpetas, las extensiones de imagen adicionales (.avif, .webp, .jpeg) y la carpeta data/ con sus archivos JSON que aparecen en tu imagen:

Plaintext


├── admin/
│   ├── admin.html
│   ├── categorias.html
│   ├── dashboard.html
│   ├── eventos.html
│   └── reportes.html
├── assets/img/
│   ├── concierto.jpg
│   ├── dark hero..png
│   ├── dark mode.png
│   ├── digital-circus.png
│   ├── electro.avif
│   ├── images.jpeg
│   ├── regueton.webp
│   ├── rock.webp
│   └── salsa.jpg
├── css/
│   ├── responsive.css
│   └── styles.css
├── data/
│   └── eventos.json
├── js/
│   ├── admin.js
│   ├── cart.js
│   ├── components.js
│   ├── data-seed.js
│   ├── main.js
│   ├── registro.js
│   └── storage.js
├── .gitignore
├── admin.html
├── eventos.html
├── index.html
└── README.md
```

## 💾 Datos en localStorage

| Clave | Contenido |
|---|---|
| `conciertos_categorias` | Array de categorías `{ id, nombre, descripcion }` |
| `conciertos_paises` | Array de países `{ id, nombre, ciudades[] }` |
| `conciertos_eventos` | Array de eventos `{ id, codigo, nombre, categoriaId, paisId, precio, fecha, hora, ciudad, imagen, descripcion }` |
| `conciertos_carrito` | Array de eventos agregados al carrito |
| `conciertos_ventas` | Array de ventas `{ id, fecha, cliente, ciudad, items[], total }` |
| `conciertos_sesion_admin` | Objeto `{ email }` de sesión activa |
| `registro_contactos` | Array de mensajes `{ id, fecha, nombre, email, asunto, mensaje }` |

## 🔄 Flujo de Scripts

**Vista pública** (`index.html`):
```
storage.js → registro.js → data-seed.js → components.js → cart.js → main.js
```

**Panel admin** (`admin/*.html`):
```
storage.js → registro.js → data-seed.js → admin.js
```

## 🌍 Países Incluidos

197 países con sus principales ciudades. Los países se cargan automáticamente al iniciar la aplicación si no existen en localStorage. Para restablecerlos, limpia el localStorage desde la consola del navegador:

```js
localStorage.removeItem('conciertos_paises');
```

Luego recarga la página.

## 👥 Créditos

Proyecto desarrollado por Álvaro y Javier como sistema de gestión de conciertos.
