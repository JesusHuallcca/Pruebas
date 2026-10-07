# TaskFlow

Lista de tareas con filtros, prioridades, buscador y modo oscuro.
Hecha con HTML, CSS y JavaScript puro. Abre `index.html` en el navegador.

## Estructura

```
lista-tareas/
├── index.html
├── style.css
├── app.js
└── README.md
```

---

# Práctica de Git y GitHub: pull request y merge

## Paso 1. Subir el proyecto a GitHub (una sola vez)

1. En GitHub crea un repositorio nuevo llamado `taskflow` (sin README).
2. En la terminal, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Agregar TaskFlow: lista de tareas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/taskflow.git
git push -u origin main
```

## Paso 2. Crear una rama para el cambio

Nunca trabajes directo en `main`. Crea una rama por cada cambio:

```bash
git checkout -b feature/pie-de-pagina
```

## Paso 3. Hacer el cambio

Elige un ejercicio de la lista de abajo (empieza por el Ejercicio 1) y guárdalo:

```bash
git add .
git commit -m "Agregar pie de página con el año actual"
```

## Paso 4. Subir la rama

```bash
git push origin feature/pie-de-pagina
```

## Paso 5. Abrir el Pull Request (en GitHub)

1. Entra a tu repositorio. Aparece un aviso amarillo: **Compare & pull request**.
2. Escribe un título y una descripción de lo que cambiaste.
3. Revisa la pestaña **Files changed**: ahí ves línea por línea lo que cambió.
4. Pulsa **Create pull request**.

## Paso 6. Hacer el Merge (en GitHub)

1. Dentro del pull request pulsa **Merge pull request**.
2. Pulsa **Confirm merge**.
3. Opcional: **Delete branch** para borrar la rama ya fusionada.

## Paso 7. Actualizar tu computadora

El merge ocurrió en GitHub, así que tu copia local aún no lo tiene:

```bash
git checkout main
git pull origin main
git branch -d feature/pie-de-pagina
```

Repite desde el Paso 2 con el siguiente ejercicio.

---

# Ejercicios

## Ejercicio 1: pie de página (rama `feature/pie-de-pagina`)

En `index.html`, justo antes de `</main>`, agrega:

```html
<p class="creditos">Hecho con ❤ por TU_NOMBRE · <span id="anio"></span></p>
```

En `style.css`, al final:

```css
.creditos { text-align: center; color: var(--suave); font-size: .85rem; margin-top: 24px; }
```

En `app.js`, al final:

```js
document.getElementById("anio").textContent = new Date().getFullYear();
```

## Ejercicio 2: contador de caracteres (rama `feature/contador-caracteres`)

En `app.js`, al final:

```js
input.addEventListener("input", () => {
  input.title = `${input.value.length}/80 caracteres`;
});
```

## Ejercicio 3: editar una tarea con doble clic (rama `feature/editar-tarea`)

En `app.js`, dentro de `mostrar()`, después de crear `span`, agrega:

```js
span.addEventListener("dblclick", () => {
  const nuevo = prompt("Editar tarea:", t.texto);
  if (nuevo && nuevo.trim()) {
    t.texto = nuevo.trim();
    guardar();
    mostrar();
  }
});
```

## Ejercicio 4 (avanzado): provocar un conflicto de merge

1. Crea dos ramas desde `main`: `cambio-a` y `cambio-b`.
2. En ambas cambia **la misma línea** del `<h1>` en `index.html`, con texto distinto.
3. Haz commit y push de las dos, y abre un pull request por cada una.
4. Fusiona la primera. En la segunda GitHub dirá **This branch has conflicts**.
5. Pulsa **Resolve conflicts**, elige qué texto conservar, borra los marcadores
   `<<<<<<<`, `=======`, `>>>>>>>` y confirma el merge.

---

# Ejercicios con los archivos del proyecto

Cada ejercicio toca un archivo distinto, así ves cómo Git registra los cambios de cada uno.
Sigue los mismos pasos 2 a 7 de arriba: rama, cambio, commit, push, pull request y merge.

## Ejercicio 5: solo `style.css` (rama `feature/color-acento`)

Cambia el color principal. En `style.css`, dentro de `:root`, modifica:

```css
--acento: #0d9488;
--acento-h: #0f766e;
```

Antes del commit mira el cambio con `git diff`: verás solo 2 líneas distintas en un archivo.

## Ejercicio 6: solo `index.html` (rama `feature/favicon`)

Agrega un ícono a la pestaña del navegador. En `index.html`, dentro de `<head>`:

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='.9em' font-size='90'>✅</text></svg>">
```

## Ejercicio 7: `index.html` y `app.js` (rama `feature/marcar-todas`)

Botón para marcar todas las tareas como hechas.

En `index.html`, dentro del `<footer class="pie">`, junto al botón de borrar:

```html
<button id="marcarTodas" class="enlace" type="button">Marcar todas</button>
```

En `app.js`, antes de `// Tema claro / oscuro`:

```js
$("marcarTodas").addEventListener("click", () => {
  tareas.forEach((t) => (t.hecha = true));
  guardar();
  mostrar();
});
```

Mira `git status`: ahora dos archivos aparecen modificados en el mismo commit.

## Ejercicio 8: crear un archivo nuevo (rama `docs/changelog`)

Crea un archivo `CHANGELOG.md` en la carpeta del proyecto:

```markdown
# Cambios

## Versión 1.1
- Agregado pie de página
- Agregado color de acento nuevo
```

```bash
git add CHANGELOG.md
git commit -m "Agregar CHANGELOG"
```

En el pull request aparece como archivo nuevo (**added**), todo en verde.

## Ejercicio 9: renombrar un archivo (rama `refactor/renombrar-js`)

Cambia `app.js` por `script.js`. Hazlo con Git para que registre el renombre:

```bash
git mv app.js script.js
```

Luego en `index.html` actualiza la línea del script:

```html
<script src="script.js"></script>
```

En el pull request, GitHub muestra `app.js → script.js`. Si no cambias el contenido, Git entiende que es el mismo archivo y conserva su historial.

## Ejercicio 10: borrar un archivo (rama `chore/borrar-notas`)

1. Crea un archivo `notas.txt` con cualquier texto y haz commit.
2. Bórralo con Git y haz otro commit:

```bash
git rm notas.txt
git commit -m "Borrar notas.txt"
```

En el pull request el archivo aparece como borrado (**deleted**), todo en rojo.

## Ejercicio 11: recuperar un archivo borrado (sin pull request)

Es el ejemplo del video: Git como tarjeta de memoria. Con todo guardado en un commit:

```bash
rm style.css          # borras el archivo (en Windows: del style.css)
git restore style.css # lo recuperas del último commit
```

Si ya habías hecho commit del borrado, búscalo en el historial y recupéralo:

```bash
git log --oneline -- style.css
git checkout HASH~1 -- style.css
```

Cambia `HASH` por el hash del commit que borró el archivo.

---

# Ejercicios con el código

Ahora cambios en la lógica de `app.js`. Cada uno es una rama y un pull request.
Haz primero el 12 y el 13 en orden: el 13 depende del 12 (mira el aviso en el ejercicio 13).

## Ejercicio 12: arreglar un bug real (rama `fix/tarea-vacia`)

El proyecto tiene un error. Escribe solo espacios en el campo y pulsa **Agregar**: se crea una tarea vacía.
Pasa porque `required` acepta espacios, y el `trim()` los borra después.

En `app.js`, dentro del `submit` del formulario, reemplaza esto:

```js
tareas.unshift({
  id: Date.now(),
  texto: input.value.trim(),
```

por esto:

```js
const texto = input.value.trim();
if (!texto) return;

tareas.unshift({
  id: Date.now(),
  texto: texto,
```

Prueba en el navegador antes de hacer commit. Mensaje sugerido: `Corregir: no permitir tareas vacías`.
En la descripción del pull request explica cómo reproducir el error. Es lo que se hace en un equipo.

## Ejercicio 13: evitar tareas repetidas (rama `feature/sin-duplicados`)

Antes de empezar: haz el merge del ejercicio 12 y actualiza tu copia con `git checkout main` y `git pull origin main`.
Crea la rama **después** del pull, porque este código usa la variable `texto` que creó el ejercicio 12.

Justo debajo de `if (!texto) return;` agrega:

```js
if (tareas.some((t) => t.texto.toLowerCase() === texto.toLowerCase())) {
  alert("Esa tarea ya existe");
  return;
}
```

## Ejercicio 14: ordenar por prioridad (rama `feature/ordenar`)

En `index.html`, dentro de `<nav class="filtros">`, después del buscador:

```html
<select id="orden" aria-label="Ordenar">
  <option value="reciente">Más recientes</option>
  <option value="prioridad">Por prioridad</option>
</select>
```

En `app.js`, dentro de `mostrar()`, justo después del bloque `const visibles = ...;`:

```js
if ($("orden").value === "prioridad") {
  const peso = { alta: 0, media: 1, baja: 2 };
  visibles.sort((a, b) => peso[a.prioridad] - peso[b.prioridad]);
}
```

Y en `app.js`, justo antes de `// Tema claro / oscuro`:

```js
$("orden").addEventListener("change", mostrar);
```

## Ejercicio 15: atajos de teclado (rama `feature/atajos`)

Pulsar `/` enfoca el buscador y `Escape` lo limpia. En `app.js`, antes de `mostrar();` final:

```js
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    buscar.focus();
  }
  if (e.key === "Escape") {
    buscar.value = "";
    mostrar();
    buscar.blur();
  }
});
```

## Ejercicio 16: exportar tareas a JSON (rama `feature/exportar`)

En `index.html`, dentro del `<footer class="pie">`:

```html
<button id="exportar" class="enlace" type="button">Exportar</button>
```

En `app.js`, antes de `// Tema claro / oscuro`:

```js
$("exportar").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(tareas, null, 2)], { type: "application/json" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "tareas.json";
  enlace.click();
  URL.revokeObjectURL(enlace.href);
});
```

## Ejercicio 17: refactor sin cambiar el comportamiento (rama `refactor/crear-tarea`)

Un refactor ordena el código, pero la app debe hacer exactamente lo mismo.
Saca la creación del objeto a su propia función. En `app.js`, antes del `form.addEventListener("submit", ...)`:

```js
function crearTarea(texto, prioridad) {
  return { id: Date.now(), texto, prioridad, hecha: false };
}
```

Y en el `submit`, reemplaza el objeto completo por:

```js
tareas.unshift(crearTarea(texto, prioridad.value));
```

Verifica que todo siga funcionando igual. En el pull request, revisa que **Files changed** muestre líneas borradas y agregadas, pero ninguna función nueva para el usuario.

## Ejercicio 18: revisión de código (cualquiera de las ramas anteriores)

1. Abre un pull request y ve a **Files changed**.
2. Pasa el mouse sobre una línea de código y pulsa el botón **+** azul.
3. Escribe un comentario, por ejemplo: «Este nombre de variable podría ser más claro».
4. Pulsa **Start a review** y luego **Finish your review**.
5. Haz el cambio en tu computadora, otro commit, y `git push origin nombre-de-la-rama`.

El pull request se actualiza solo con el commit nuevo. No necesitas abrir otro.

## Ejercicio 19: un conflicto de código real

Abre a la vez los ejercicios 14 y 16 sin hacer merge de ninguno. Los dos agregan código en la misma zona de `app.js`.
Haz merge de uno: el otro quedará con conflicto. Resuélvelo conservando **ambos** bloques de código.

---

# Comandos de referencia

| Comando | Para qué sirve |
|---------|----------------|
| `git status` | Ver qué cambió |
| `git branch` | Listar ramas |
| `git checkout -b nombre` | Crear rama y entrar |
| `git checkout main` | Volver a main |
| `git push origin nombre` | Subir una rama |
| `git pull origin main` | Bajar cambios de GitHub |
| `git branch -d nombre` | Borrar rama local |
| `git diff` | Ver los cambios antes del commit |
| `git mv viejo nuevo` | Renombrar un archivo |
| `git rm archivo` | Borrar un archivo |
| `git restore archivo` | Recuperar un archivo del último commit |
