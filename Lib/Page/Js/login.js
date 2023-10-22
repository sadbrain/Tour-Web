
// import { createHmac } from "crypto"

// const salt= "8b65b9403b9427421db5921a2b182eae";
const usersAPi = "http://localhost:3000/users";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const sumbit = document.querySelector("#sumbit");
// const encodedPassword = hashPassword(password.value, salt);
// console.log(encodedPassword); 
// console.log(hashPassword("asa"),salt);

function hashPassword(password, salt) {
  const hash = createHmac('sha256', salt).update(password).digest('hex');
  return hash;
}
async function fetchDataFromAPI() {
  try {
    const response = await fetch(usersAPi, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
sumbit.onclick = async function login() {
  try {
    // Fetch data from the API
    const data = await fetchDataFromAPI();

    if (_checkUserValid(data)) {
      alert("Đăng nhập thành công");
      _setCurrentUser(data); // Define this function
      _navigateToHome(); // Define this function for navigation
    } else {
      alert("Email hoặc mật khẩu của bạn sai, vui lòng nhập lại!");

          }      // import {hashPassword} from "./hashPassword.js";
const usersAPi = "http://localhost:3000/users";
const email = document.querySelector("#email");
const password = document.querySelector("#password");
// const encodedPassword = hashPassword(password.value, process.env.PASSWORD_SALT);
// console.log(encodedPassword);
async function login() {
  try {
    var response = await fetch(usersAPi);

    if (response.ok) {
      response.json().then((data) => {
        if (_checkUserValid(data)) {
          alert("đăng nhập thành công");

          _setCurrentUser(data);
          _navigateToHome();
        } else {
          alert("email hoặc password của bạn sai, vùi lòng nhập lại!");
        }
      });

    } else {

    }
  } catch (err) {
    alert(err.message);
  }
}

function _checkUserValid(data) {

  return data.some((element) => {
    return element.email == email.value && element.password == password.value;
  });
}

function _setCurrentUser(data) {
  const element = data.find((element) => {

    return element.email == email.value && element.password == password.value;
  });
  if (element != undefined) {
    const obj = {
      id: element.id,
      role: element.id_role
    }

    localStorage.setItem("user_token", JSON.stringify(obj));
    

    console.log(email.value);
    console.log(password.value);
    return element.email == email.value && element.password == password.value;
  });
  if (element != undefined) {
    const arr = [{
      id: element.id,
      role: element.role
    }]
    localStorage.setItem("user_token", arr);
  }
}

function _navigateToHome() {

  const user_token = JSON.parse(localStorage.getItem("user_token"));

  if (user_token) {
    if(user_token.role == 2) {
      window.location.href = "./home.html";
    }else{  

      window.location.href = "../Page/Admin/home.html";
     
  if (localStorage.getItem("user_token")) {
    if(localStorage.getItem("user_token").role == 2) {
      window.location.href = "./home.html";
    }else{
      window.location.href = "../Admin/home.html";

    }
  }
}


