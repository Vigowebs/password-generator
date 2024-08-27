const range = document.querySelector('.range');
const length = document.querySelector('.length');
const password = document.querySelector('.password');
const tooltip = document.querySelector('.tooltip');
let options = [];


const reset = () => setTimeout(() => tooltip.classList.remove('animate'), 500);

function copyPassword() {
  if (!options.length) return;
  navigator.clipboard.writeText(password.value);
  tooltip.classList.add('animate');
  tooltip.addEventListener('transitionend', reset, false);
}

function updateRange(e) {
  length.textContent = this.value;
  insertPassword(e);
}

const insertPassword = (e) => password.value = updatePassword(e);

const random = (str) => str[Math.floor(Math.random() * str.length)];

function generatePassword(options, amount, res = '') {
  for (let i = 0; i < amount; i++) res += random(options.join(''));
  return options.length ? res : '';
}

function updateOptions(checkbox) {
  return checkbox.checked
    ? [...options, checkbox.value]
    : options.filter((v) => v !== checkbox.value);
}

function updatePassword(checkbox) {
  options = updateOptions(checkbox);
  return generatePassword(options, range.value);
}

function init(e) {
  e.target.matches(`input[type='checkbox']`) && updatePassword(e.target);
  e.target.matches('.btn') && insertPassword(e);
  e.target.matches('.copy') && copyPassword();
}

window.addEventListener('input', init, false);
window.addEventListener('click', init,false);
range.addEventListener('input', updateRange,false);