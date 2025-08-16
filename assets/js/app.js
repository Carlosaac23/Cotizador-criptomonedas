const criptomonedasSelect = document.getElementById('criptomonedas');
const monedasSelect = document.getElementById('moneda');
const formulario = document.getElementById('formulario');

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

function consultarCriptomonedas() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';

  fetch(url)
    .then(res => res.json())
    .then(data => obtenerCriptomonedas(data.Data))
    .then(criptomonedas => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach(cripto => {
    console.log(cripto);
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

  // Validar
  const { moneda, criptomoneda } = objBusqueda;

  console.log(moneda, criptomoneda);

  if (moneda === '' || criptomoneda === 0) {
    mostrarAlerta('Ambos campos son obligatorios');
    return;
  }
}

function mostrarAlerta(mensaje) {
  console.log(mensaje);
}
