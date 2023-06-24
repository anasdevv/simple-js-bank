// 'use strict';
const arr = ['[200, 450, -400, 3000, -650, -130, 70, 1300]'];
const temp = arr[0].split(',').map(s => {
  if (s.includes('[')) {
    s = s.replace('[', '');
  }
  if (s.includes(']')) s = s.replace(']', '');
  return Number(s);
});
console.log(temp);
// const getAccount = async function () {
//   const accounts = await fetch('http://127.0.0.1:3000/api/v1/users');
//   const res = await accounts.json();
//   const data = res.data.users;
//   return await data.user;
// };
// console.log(getAccount());
// // console.log(getAccount().then(data => data));
// // const account1 = {
// //   name: 'Mohammad Anas',
// //   password: '123456789',
// //   passwordConfirm: '123456789',
// //   movements: [
// //     200, 450, -400, 3000, -650, -130, 70, 1300, 500, -600, 900, 1000, 5666, -66,
// //   ],
// //   interestRate: 1.2, // %
// //   pin: 1111,
// // };

// // const account2 = {
// //   name: 'Umer Hashmi',
// //   password: '123456789',
// //   passwordConfirm: '123456789',
// //   movements: [
// //     5000, 3400, -150, -790, -3210, -1000, 8500, -30, 5500, 22, 123, 999, -5000,
// //     10000,
// //   ],
// //   interestRate: 1.5,
// //   pin: 2222,
// // };

// // const account3 = {
// //   name: 'Anas Imran',
// //   password: '123456789',
// //   passwordConfirm: '123456789',
// //   movements: [
// //     200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, -700, 50, -90,
// //   ],
// //   interestRate: 0.7,
// //   pin: 3333,
// // };

// // const account4 = {
// //   name: 'Ali Mirza',
// //   password: '123456789',
// //   passwordConfirm: '123456789',
// //   movements: [430, 1000, 700, 50, 90, 5000, 3400, -150, -790],
// //   interestRate: 1,
// //   pin: 4444,
// // };

// // const accounts = [account1, account2, account3, account4];
// // const fields = [
// //   'name',
// //   'password',
// //   'passwordConfirm',
// //   'movements',
// //   'interestRate',
// //   'pin',
// // ];
// // const createAccount = async function (acc) {
// //   let headers = new Headers();
// //   console.log(acc);
// //   headers.append('Content-Type', 'application/json');
// //   headers.append('Accept', 'application/json');
// //   // Access-Control-Allow-Headers: Content-Type, Authorization
// //   headers.append(
// //     'Access-Control-Allow-Headers',
// //     'Content-Type , Authorization'
// //   );
// //   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   headers.append('Access-Control-Allow-Credentials', 'true');
// //   const url = 'http://127.0.0.1:3000/api/v1/users/signup';
// //   const res = await fetch(url, {
// //     method: 'POST',
// //     headers: headers,
// //     body: JSON.stringify(acc),
// //     cache: 'default',
// //   });
// //   return res.json();
// // };
// // const signUp = function (account) {
// //   let flag = true;
// //   fields.forEach(field => {
// //     if (!(field in account)) {
// //       flag = false;
// //     }
// //   });
// //   if (flag) {
// //     createAccount(account).then(data => console.log(data));
// //   }
// // };
// const login = async function (cred) {
//   let headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');
//   // Access-Control-Allow-Headers: Content-Type, Authorization
//   headers.append(
//     'Access-Control-Allow-Headers',
//     'Content-Type , Authorization'
//   );
//   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//   headers.append('Access-Control-Allow-Credentials', 'true');
//   const url = 'http://127.0.0.1:3000/api/v1/users/login';
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(cred),
//     cache: 'default',
//   });
//   const response = await res.json();
//   const { data } = response;
//   if (response.status !== 'success') {
//     return false;
//   }
//   // console.log(response);
//   return data;
// };
// // accounts.forEach(acc => {
// //   signUp(acc);
// // });
// login();
// // const name = 'Mohammad Anas';
// // let res = name.toLowerCase().split(' ').join('');
// // res += '@accounting.com';
// // console.log(res);
