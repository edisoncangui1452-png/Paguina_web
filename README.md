# Arquitectura Monolítica

Página educativa y adaptable que explica los fundamentos de la arquitectura monolítica, presenta un ejemplo de tienda en línea, compara el monolito con los microservicios e incluye un quiz interactivo.

## Estructura del proyecto

```text
Paguina_web/
├── css/
│   └── style.css
├── img/
│   └── FOTO.jpeg
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Tecnologías

- HTML5 semántico para el contenido y las secciones accesibles.
- CSS3 para el estilo glassmorphism, los colores y los diagramas adaptables.
- Bootstrap 5.3 para la navegación, la cuadrícula responsive y la tabla.
- JavaScript puro para validar el quiz, calcular el puntaje y actualizar el año.
- Embed oficial de TikTok para mostrar el video educativo.

## Abrir el proyecto en GitHub Codespaces

1. Abre el repositorio en Codespaces y espera a que VS Code termine de cargar.
2. Abre `index.html`.
3. Inicia un servidor estático desde la terminal, por ejemplo con la extensión **Live Server**, o ejecuta `python3 -m http.server 8000`.
4. Si usas el servidor de Python, abre la pestaña **Ports** de Codespaces y visita el puerto `8000`.

También puedes abrir `index.html` directamente en un navegador, aunque un servidor local ofrece una experiencia más consistente para los recursos y la incrustación.

## Cambiar estilos y colores

Los colores principales se definen como variables al inicio de `css/style.css`, dentro de `:root`. Para cambiar la identidad visual, modifica `--color-fondo`, `--color-morado`, `--color-azul`, `--color-texto` y `--fondo-cristal`. El mismo archivo contiene las reglas responsive y los estilos de tarjetas, diagramas y quiz.

El contenido y las secciones se editan en `index.html`; el comportamiento interactivo se encuentra en `js/script.js`.

## Embed de TikTok

La sección de video contiene un `<blockquote class="tiktok-embed">` con el enlace publicado y carga el script oficial `https://www.tiktok.com/embed.js`. Se requiere conexión a internet y JavaScript para que TikTok renderice el reproductor. La disponibilidad del video también depende de la configuración de privacidad y de las condiciones del servicio de TikTok.

## Cómo funciona el quiz

`js/script.js` contiene las cinco respuestas correctas y sus explicaciones. Al pulsar **Comprobar respuestas**, valida que se hayan contestado todas las preguntas, calcula el resultado sobre cinco y muestra el porcentaje y la retroalimentación de cada respuesta. **Intentar de nuevo** limpia las selecciones y permite repetir el test.
