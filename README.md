# Camila Carlevaro — Portfolio

Portfolio React + Vite con el estilo de la referencia Ludwig: fondo negro, cabecera centrada y galería de dos columnas.

## Iniciar

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

## Proyectos

Los siete cortometrajes están definidos en `src/projects.js`. Sus portadas son fotogramas de los videos, que se reproducen con controles nativos dentro del detalle. Al cerrar el detalle, la reproducción se detiene.

Los archivos listos para la web están en `public/proyectos/cortometrajes/`. Los originales se conservan en `Porfolio/CORTOMETRAJES/`. Los MP4 tienen sus metadatos al inicio para permitir reproducción progresiva. Se conserva la calidad de imagen original.

Para incorporar otro proyecto, agregar sus archivos en `public/proyectos/` y una entrada con `id`, `title`, `category`, `cover`, `video` y `description`. También admite `images` para galerías y `year`.

Los videos actuales suman cerca de 2 GB. La compilación los incluye: el proveedor de hosting deberá admitir ese tamaño o se deberán mover a un servicio de video antes de publicar.

La biografía y contacto se editan en `src/main.jsx`.
