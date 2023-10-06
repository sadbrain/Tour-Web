// import {hashPassword} from "./hashPassword.js";
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
  if (localStorage.getItem("user_token")) {
    if(localStorage.getItem("user_token").role == 2) {
      window.location.href = "./home.html";
    }else{
      window.location.href = "../Admin/home.html";
     
    }
  }
}


