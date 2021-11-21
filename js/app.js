//? Variables

//Contenedor para mostrar los resultados

const resultados = document.querySelector("#resultado");

//Variables para el buscador

const marca = document.querySelector("#marca");

const year = document.querySelector("#year");

const precio_min = document.querySelector("#minimo");

const precio_max = document.querySelector("#maximo");

const puertas = document.querySelector("#puertas");

const transmision = document.querySelector("#transmision");

const color = document.querySelector("#color");

const max = new Date().getFullYear();
const min = max - 10;

//* Objeto que guarda los parámetros de la búsqueda

const datosBusqueda = {
  marca: marca.value,
  year: year.value,
  precio_min: precio_min.value,
  precio_max: precio_max.value,
  puertas: puertas.value,
  transmision: transmision.value,
  color: color.value,
};

//? Eventos

//* Al iniciar el html

document.addEventListener("DOMContentLoaded", () => {
  //* Mostrar todos los coches
  mostrarCoches(autos);

  //* LLenar selección de años

  llenarSelect();
});

//* Al seleccionar un elemento para la busqueda

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarCoche();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarCoche();
});

precio_min.addEventListener("change", (e) => {
  datosBusqueda.precio_min = parseInt(e.target.value);
  filtrarCoche();
});

precio_max.addEventListener("change", (e) => {
  datosBusqueda.precio_max = parseInt(e.target.value);
  filtrarCoche();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarCoche();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarCoche();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarCoche();
});

//? Funciones

function mostrarCoches(coches) {
  limpiarHTML();
  coches.forEach((coche) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = coche;
    const resultado = document.createElement("p");
    resultado.textContent = `${marca} ${modelo} - Año: ${year} - Precio: ${precio}$ - Puertas: ${puertas} - Color ${color} - Transmisión: ${transmision}`;
    resultados.appendChild(resultado);
  });
}

//* Función que limpia el HTML
function limpiarHTML() {
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

//* Funcion que filtra según la búsqueda

function filtrarCoche() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarPrecioMinimo)
    .filter(filtrarPrecioMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    //* Actualizamos el HTML
    mostrarCoches(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();
  const resultado = document.createElement("div");
  resultado.classList.add("alerta", "error");
  resultado.textContent = "No se han encontrado coches con esos parámetros";
  resultados.appendChild(resultado);
}

function filtrarMarca(coche) {
  const { marca } = datosBusqueda;
  if (marca) {
    return coche.marca === marca;
  }
  return coche;
}

function filtrarYear(coche) {
  const { year } = datosBusqueda;
  if (year) {
    return coche.year === year;
  }
  return coche;
}

function filtrarPrecioMinimo(coche) {
  const { precio_min } = datosBusqueda;
  if (precio_min) {
    return coche.precio >= precio_min;
  } else {
    return coche;
  }
}

function filtrarPrecioMaximo(coche) {
  const { precio_max } = datosBusqueda;
  if (precio_max) {
    return coche.precio <= precio_max;
  } else {
    return coche;
  }
}

function filtrarPuertas(coche) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return coche.puertas === puertas;
  } else {
    return coche;
  }
}

function filtrarTransmision(coche) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return coche.transmision === transmision;
  } else {
    return coche;
  }
}

function filtrarColor(coche) {
  const { color } = datosBusqueda;
  if (color) {
    return coche.color === color;
  } else {
    return coche;
  }
}
