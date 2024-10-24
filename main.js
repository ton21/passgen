const $q = (el) => document.querySelector(el);
const $qa = (el) => document.querySelectorAll(el);

const passGen = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_-+=[]{}|;:,.<>?';

  const generate = (
    length,
    { includeLowercase, includeUppercase, includeNumbers, includeSymbols }
  ) => {
    let charPool = '';
    const guaranteedChars = [];

    if (includeLowercase) {
      charPool += lowercase;
      guaranteedChars.push(
        lowercase[Math.floor(Math.random() * lowercase.length)]
      );
    }
    if (includeUppercase) {
      charPool += uppercase;
      guaranteedChars.push(
        uppercase[Math.floor(Math.random() * uppercase.length)]
      );
    }
    if (includeNumbers) {
      charPool += numbers;
      guaranteedChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (includeSymbols) {
      charPool += symbols;
      guaranteedChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    const remainingLength = length - guaranteedChars.length;
    const randomChars = Array.from({ length: remainingLength }, () => {
      return charPool[Math.floor(Math.random() * charPool.length)];
    });

    const passwordArray = [...guaranteedChars, ...randomChars];

    // Shuffle using ES6 `sort` method with a random comparator
    return passwordArray
      .sort(() => Math.random() - 0.5) // Simple way to shuffle an array
      .join('');
  };

  return { generate };
};

// Event listeners
const lengthField = $q('#length');
const copyMessageEl = $q('#copy-message');

if (lengthField) {
  lengthField.addEventListener('input', (e) => {
    $q('#length-value').innerText = e.target.value;
    copyMessageEl.innerText = '';
  });
}

if ($q('#generate')) {
  $q('#generate').addEventListener('click', () => {
    const length = +lengthField.value; // Convert length to number with the '+' operator
    const options = {
      includeLowercase: $q('#include-lowercase').checked,
      includeUppercase: $q('#include-uppercase').checked,
      includeNumbers: $q('#include-numbers').checked,
      includeSymbols: $q('#include-symbols').checked,
    };
    const password = passGen().generate(length, options);
    $q('#password').value = password;
  });
}

if ($q('#copy')) {
  $q('#copy').addEventListener('click', (e) => {
    e.preventDefault();
    const passField = $q('#password');
    passField.select();
    passField.setSelectionRange(0, 99999);

    if (passField.value) copyToClipboard(passField.value);
  });
}

const copyToClipboard = async (val) => {
  try {
    await navigator.clipboard.writeText(val);
    copyMessageEl.innerText = 'Password copied to clipboard';
  } catch (error) {
    console.error(error);
  }
};
