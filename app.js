const $ = (id) => document.getElementById(id);

const form = $("form"), input = $("input"), prioridad = $("prioridad");
const lista = $("lista"), vacio = $("vacio"), buscar = $("buscar");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "todas";

function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrar() {
  const texto = buscar.value.trim().toLowerCase();

  const visibles = tareas.filter((t) => {
    if (filtro === "pendientes" && t.hecha) return false;
    if (filtro === "hechas" && !t.hecha) return false;
    return t.texto.toLowerCase().includes(texto);
  });

  lista.innerHTML = "";
  visibles.forEach((t) => {
    const li = document.createElement("li");
    li.className = `${t.prioridad} ${t.hecha ? "hecha" : ""}`;

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.hecha;
    check.setAttribute("aria-label", "Marcar como hecha");
    check.addEventListener("change", () => {
      t.hecha = check.checked;
      guardar();
      mostrar();
    });

    const span = document.createElement("span");
    span.className = "texto";
    span.textContent = t.texto;

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = t.prioridad;

    const borrar = document.createElement("button");
    borrar.className = "borrar";
    borrar.textContent = "✕";
    borrar.setAttribute("aria-label", "Borrar tarea");
    borrar.addEventListener("click", () => {
      tareas = tareas.filter((x) => x.id !== t.id);
      guardar();
      mostrar();
    });

    li.append(check, span, etiqueta, borrar);
    lista.appendChild(li);
  });

  vacio.hidden = visibles.length > 0;
  actualizarResumen();
}

function actualizarResumen() {
  const total = tareas.length;
  const hechas = tareas.filter((t) => t.hecha).length;
  const pendientes = total - hechas;
  const porcentaje = total ? Math.round((hechas / total) * 100) : 0;

  $("total").textContent = total;
  $("pendientes").textContent = pendientes;
  $("hechas").textContent = hechas;
  $("barra").style.width = porcentaje + "%";
  document.querySelector(".progreso").setAttribute("aria-valuenow", porcentaje);
  $("contador").textContent = `${porcentaje}% completado`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tareas.unshift({
    id: Date.now(),
    texto: input.value.trim(),
    prioridad: prioridad.value,
    hecha: false,
  });
  input.value = "";
  guardar();
  mostrar();
});

document.querySelectorAll(".filtro").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filtro.activo").classList.remove("activo");
    btn.classList.add("activo");
    filtro = btn.dataset.filtro;
    mostrar();
  });
});

buscar.addEventListener("input", mostrar);

$("limpiar").addEventListener("click", () => {
  tareas = tareas.filter((t) => !t.hecha);
  guardar();
  mostrar();
});

// Tema claro / oscuro
function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  $("tema").textContent = oscuro ? "☀️" : "🌙";
  localStorage.setItem("oscuro", oscuro);
}
$("tema").addEventListener("click", () => aplicarTema(!document.body.classList.contains("oscuro")));
aplicarTema(localStorage.getItem("oscuro") === "true");

// Fecha de hoy
$("fecha").textContent = new Date().toLocaleDateString("es-PE", {
  weekday: "long", day: "numeric", month: "long",
});

mostrar();