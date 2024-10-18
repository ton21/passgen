const $q = (el) => {
  return document.querySelector(el);
};
const $qa = (el) => {
  return document.querySelectorAll(el);
};

const passGen = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_-+=[]{}|;:,.<>?';

  const generate = (length, options) => {
    let charPool = '';
    if (options.includeLowercase) {
      charPool += lowercase;
    }
    if (options.includeUppercase) {
      charPool += uppercase;
    }
    if (options.includeNumbers) {
      charPool += numbers;
    }
    if (options.includeSymbols) {
      charPool += symbols;
    }

    return Array.from({ length }, () => {
      const randomIdx = Math.floor(Math.random() * charPool.length);
      return charPool[randomIdx];
    }).join('');
  };

  return { generate };
};

const lengthField = $q('#length');
const copyMessageEl = $q('#copy-message');

if (lengthField)
  lengthField.addEventListener('input', (e) => {
    $q('#length-value').innerText = e.target.value;
    copyMessageEl.innerText = '';
  });

if ($q('#generate'))
  $q('#generate').addEventListener('click', () => {
    const length = lengthField.value;
    const options = {
      includeLowercase: $q('#include-lowercase').checked,
      includeUppercase: $q('#include-uppercase').checked,
      includeNumbers: $q('#include-numbers').checked,
      includeSymbols: $q('#include-symbols').checked,
    };
    const generator = passGen();
    const password = generator.generate(length, options);

    $q('#password').value = password;
  });

if ($q('#copy'))
  $q('#copy').addEventListener('click', (e) => {
    e.preventDefault();
    const passField = $q('#password');
    passField.select();
    passField.setSelectionRange(0, 99999); // for mobile

    if (passField.value.length > 0) copyToClibBoard(passField.value);
  });

const copyToClibBoard = async (val) => {
  try {
    navigator.clipboard.writeText(val);
    copyMessageEl.innerText = 'Password copied to clipboard';
  } catch (error) {
    console.log(error);
  }
};
