const criptomonedasSelect = document.getElementById('criptomonedas');

// Crear un Promise
const obtenerCriptomonedas = criptomonedas =>
  new Promise(resolve => {
    resolve(criptomonedas);
  });

document.addEventListener('DOMContentLoaded', consultarCriptomonedas);

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
