const form = document.getElementById("formCertificado");
const certificado = document.getElementById("certificado");

const campos = {
  institucion: document.getElementById("institucion"),
  evento: document.getElementById("evento"),
  nombre: document.getElementById("nombre"),
  grado: document.getElementById("grado"),
  reconocimiento: document.getElementById("reconocimiento"),
  fecha: document.getElementById("fecha"),
  firmaUno: document.getElementById("firmaUno"),
  firmaDos: document.getElementById("firmaDos"),
  tema: document.getElementById("tema"),
  logoInput: document.getElementById("logoInput"),
};

const vista = {
  institucion: document.getElementById("vistaInstitucion"),
  institucionIntro: document.getElementById("vistaInstitucionIntro"),
  evento: document.getElementById("vistaEvento"),
  nombre: document.getElementById("vistaNombre"),
  grado: document.getElementById("vistaGrado"),
  reconocimiento: document.getElementById("vistaReconocimiento"),
  fecha: document.getElementById("vistaFecha"),
  firmaUno: document.getElementById("vistaFirmaUno"),
  firmaDos: document.getElementById("vistaFirmaDos"),
  logo: document.getElementById("logoPreview"),
  logoPlaceholder: document.getElementById("logoPlaceholder"),
};

const btnRestablecer = document.getElementById("btnRestablecer");
const btnImprimir = document.getElementById("btnImprimir");

function valorConRespaldo(valor, respaldo) {
  const limpio = valor.trim();
  return limpio.length > 0 ? limpio : respaldo;
}

function formatearFecha(valorFecha) {
  if (!valorFecha) return "14 de febrero de 2026";
  const [anio, mes, dia] = valorFecha.split("-").map(Number);
  if (!anio || !mes || !dia) return "14 de febrero de 2026";
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function actualizarVista() {
  const institucion = valorConRespaldo(campos.institucion.value, "Colegio CIMCEF");

  vista.institucion.textContent = institucion;
  vista.institucionIntro.textContent = institucion;
  vista.evento.textContent = valorConRespaldo(
    campos.evento.value,
    "Señorita Carnaval 2026"
  );
  vista.nombre.textContent = valorConRespaldo(
    campos.nombre.value,
    "Nombre de la estudiante"
  );
  vista.grado.textContent = valorConRespaldo(
    campos.grado.value,
    "Grado o categoría"
  );
  vista.reconocimiento.textContent = valorConRespaldo(
    campos.reconocimiento.value,
    "Por su destacada participación, carisma y alegría en esta celebración escolar."
  );
  vista.fecha.textContent = formatearFecha(campos.fecha.value);
  vista.firmaUno.textContent = valorConRespaldo(
    campos.firmaUno.value,
    "Dirección del Colegio"
  );
  vista.firmaDos.textContent = valorConRespaldo(
    campos.firmaDos.value,
    "Coordinación Académica"
  );

  certificado.classList.remove("theme-carnaval", "theme-tropical", "theme-atardecer");
  certificado.classList.add(`theme-${campos.tema.value}`);
}

function establecerFechaActual() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  campos.fecha.value = `${anio}-${mes}-${dia}`;
}

function limpiarLogo() {
  vista.logo.removeAttribute("src");
  vista.logo.style.display = "none";
  vista.logoPlaceholder.style.display = "inline";
}

campos.logoInput.addEventListener("change", (evento) => {
  const archivo = evento.target.files?.[0];
  if (!archivo) {
    limpiarLogo();
    return;
  }

  if (!archivo.type.startsWith("image/")) {
    limpiarLogo();
    return;
  }

  const lector = new FileReader();
  lector.onload = (e) => {
    vista.logo.src = e.target?.result;
    vista.logo.style.display = "block";
    vista.logoPlaceholder.style.display = "none";
  };
  lector.readAsDataURL(archivo);
});

form.addEventListener("input", actualizarVista);
form.addEventListener("change", actualizarVista);

btnRestablecer.addEventListener("click", () => {
  form.reset();
  establecerFechaActual();
  limpiarLogo();
  actualizarVista();
});

btnImprimir.addEventListener("click", () => {
  window.print();
});

establecerFechaActual();
limpiarLogo();
actualizarVista();
