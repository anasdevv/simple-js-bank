'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// my-bank APP

/////////////////////////////////////////////////

// code for signup process you can explore it on your own
const account1 = {
  name: 'Mohammad Anas',
  password: '123456789',
  passwordConfirm: '123456789',
  movements: [
    200, 450, -400, 3000, -650, -130, 70, 1300, 500, -600, 900, 1000, 5666, -66,
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  name: 'Umer Hashmi',
  password: '123456789',
  passwordConfirm: '123456789',
  movements: [
    5000, 3400, -150, -790, -3210, -1000, 8500, -30, 5500, 22, 123, 999, -5000,
    10000,
  ],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  name: 'Anas Imran',
  password: '123456789',
  passwordConfirm: '123456789',
  movements: [
    200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, -700, 50, -90,
  ],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  name: 'Ali Mirza',
  password: '123456789',
  passwordConfirm: '123456789',
  movements: [430, 1000, 700, 50, 90, 5000, 3400, -150, -790],
  interestRate: 1,
  pin: 4444,
};

// const accounts = [account1, account2, account3, account4];
const fields = [
  'name',
  'password',
  'passwordConfirm',
  'movements',
  'interestRate',
  'pin',
];
const createAccount = async function (acc) {
  let headers = new Headers();
  console.log(acc);
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // Access-Control-Allow-Headers: Content-Type, Authorization
  headers.append(
    'Access-Control-Allow-Headers',
    'Content-Type , Authorization'
  );
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');
  const url = 'http://127.0.0.1:3000/api/v1/users/signup';
  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(acc),
    cache: 'default',
  });
  return res.json();
};
const signUp = function (account) {
  let flag = true;
  fields.forEach(field => {
    if (!(field in account)) {
      flag = false;
    }
  });
  if (flag) {
    createAccount(account).then(data => console.log(data));
  }
};

// Data

// requesting data from an api that we just created
const getAccount = async function () {
  accounts = await fetch('http://127.0.0.1:3000/api/v1/users');
  const res = await accounts.json();
  const data = res.data.users;
  console.log(data);
  data.forEach(user => {
    const temp = user.movements;
    console.log(temp);
  });
  return data;
};
// login call to api
const apiLogin = async function (cred) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // Access-Control-Allow-Headers: Content-Type, Authorization
  headers.append(
    'Access-Control-Allow-Headers',
    'Content-Type , Authorization'
  );
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');
  const url = 'http://127.0.0.1:3000/api/v1/users/login';
  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(cred),
    cache: 'default',
  });
  const response = await res.json();
  const { data } = response;
  if (response.status !== 'success') {
    return false;
  }
  return data.user;
};
const accounts = [account1, account2, account3, account4];

accounts.forEach(acc => {
  let preEmail = acc.name.toLowerCase().split(' ').join('');
  preEmail += '@accounting.com';
  acc.email = preEmail;
  acc.password = 123456789;
});
// const accounts = getAccount();
console.log(accounts);
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const errorMessage = document.getElementById('error_message');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUserEmail = document.querySelector('.login__input--user');
const inputLoginPassword = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.name
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  labelWelcome.style.color = 'black';
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = ` As of ${day}/${month}/${year}`;
  labelDate.innerText = currentDate;
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
const logOut = function () {
  currentAccount = '';
  containerApp.style.opacity = 0;
  inputLoginPassword.style.visibility = 'visible';
  inputLoginUserEmail.style.visibility = 'visible';
  labelWelcome.textContent = 'Login to get started';
};
btnLogin.addEventListener('click', async function (e) {
  // Prevent form from submitting
  e.preventDefault();
  const credentials = {
    email: inputLoginUserEmail.value,
    password: inputLoginPassword.value,
  };
  console.log(credentials);
  currentAccount = accounts.find(acc => {
    console.log(acc);
    return (
      acc.email == credentials.email && acc.password == credentials.password
    );
  });
  if (currentAccount) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.name.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUserEmail.value = inputLoginPassword.value = '';
    inputLoginPassword.blur();
    inputLoginPassword.style.visibility = 'hidden';
    inputLoginUserEmail.style.visibility = 'hidden';
    // Update UI
    updateUI(currentAccount);
    setTimeout(logOut, 5 * 60 * 1000);
    countDownDate = new Date().getTime();

    // // Update the count down every 1 second
    // var x = setInterval(function () {
    //   // Get today's date and time
    //   var now = new Date().getTime();

    //   // Find the distance between now and the count down date
    //   var distance = countDownDate - now;

    //   // Time calculations for days, hours, minutes and seconds
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor(
    //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //   );
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   // Display the result in the element with id="demo"
    //   document.getElementById('demo').innerHTML =
    //     days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    //   // If the count down is finished, write some text
    //   if (distance < 0) {
    //     clearInterval(x);
    //     document.getElementById('demo').innerHTML = 'EXPIRED';
    //   }
    // }, 1000);
  } else {
    labelWelcome.textContent = 'incorrect credentials';
    labelWelcome.style.color = 'red';
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('hi');
  const amount = Number(inputTransferAmount.value);
  console.log(inputTransferTo.value);
  const receiverAcc = accounts.find(
    acc => acc.username == inputTransferTo.value
  );
  console.log(receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
