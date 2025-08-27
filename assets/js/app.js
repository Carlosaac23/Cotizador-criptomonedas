const criptomonedasSelect = document.getElementById('criptomonedas');
const monedasSelect = document.getElementById('moneda');
const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

const objBusqueda = {
  moneda: '',
  criptomoneda: '',
};

// Crear un Promise
const obtenerCriptomonedas = criptomonedas =>
  new Promise(resolve => {
    resolve(criptomonedas);
  });

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();
  formulario.addEventListener('submit', submitFormulario);
  criptomonedasSelect.addEventListener('change', leerValor);
  monedasSelect.addEventListener('change', leerValor);
});

async function consultarCriptomonedas() {
  const API_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const criptomonedas = await obtenerCriptomonedas(data.Data);
    selectCriptomonedas(criptomonedas);
  } catch (error) {
    console.error(error);
  }
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach(cripto => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;

    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();

  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === '' || criptomoneda === 0) {
    mostrarAlerta('¡Ambos campos son obligatorios!');
    return;
  }

  consultarAPI();
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector('.error');

  if (!existeAlerta) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = mensaje;
    formulario.appendChild(divMensaje);
    setTimeout(() => divMensaje.remove(), 2500);
  }
}

async function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;

  const API_URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  try {
    const res = await fetch(API_URL);
    const cotizacion = await res.json();
    mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
  } catch (error) {
    console.error(error);
  }
}

function mostrarCotizacionHTML(cotizacion) {
  limpiarHTML(resultado);

  const baseURL = 'https://www.cryptocompare.com';
  const { criptomoneda } = objBusqueda;
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL } = cotizacion;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

  const precioAlto = document.createElement('p');
  precioAlto.innerHTML = `Precio más alto del día: <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement('p');
  precioBajo.innerHTML = `Precio más bajo del día: <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement('p');
  ultimasHoras.innerHTML = `Variación útlimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const ultimaActualizacion = document.createElement('p');
  ultimaActualizacion.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`;

  const imagen = document.createElement('img');
  imagen.alt = `Icono de ${criptomoneda}`;
  imagen.src = baseURL + IMAGEURL;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
  resultado.appendChild(imagen);
}

function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHTML(resultado);

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);
}
