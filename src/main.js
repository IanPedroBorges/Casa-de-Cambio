import Swal from 'sweetalert2';
import './style.css';

const input = document.querySelector('#moeda');
const btn = document.querySelector('#btn-header');
const result = document.querySelector('#valores');

const creatDivs = (array, divPai) => {
  array.forEach((div) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('valor');
    divPai.appendChild(newDiv);
    const spanMoeda = document.createElement('span');
    const spanValor = document.createElement('span');
    spanMoeda.innerHTML = `<img src="./src/img/Group.svg"> ${div[0]}`;
    spanValor.innerText = `${div[1]}`;
    spanValor.classList.add('dindin');
    newDiv.appendChild(spanMoeda);
    newDiv.appendChild(spanValor);
  });
};

const verifications = (rates) => {
  const arrayRates = Object.entries(rates);
  const divPai = document.createElement('div');
  divPai.classList.add('pai');
  result.appendChild(divPai);
  const isReal = arrayRates
    .some((elemento) => elemento.includes(input.value.toUpperCase()));
  if (!isReal) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Moeda não existente!',
    });
  }
  const newP = document.createElement('p');
  newP.innerText = `Valores referentes a 1 ${input.value}`;
  result.appendChild(newP);
  creatDivs(arrayRates, divPai);
};

const fetchMoedas = (api) => {
  fetch(api)
    .then((res) => res.json())
    .then(({ rates }) => {
      verifications(rates);
    });
};

btn.addEventListener('click', () => {
  result.innerHTML = '';

  if (!input.value) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda',
    });
  }

  const apiMoeda = `https://api.exchangerate.host/latest?base=${input.value}`;
  fetchMoedas(apiMoeda);
});
