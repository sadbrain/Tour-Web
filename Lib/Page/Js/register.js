const usersAPI = "http://localhost:3000/users";
const btnRegister = document.querySelector("#register");
const btnLogin = document.querySelector("#login");

const nameUser = document.querySelector(".form_register input[name='name']");
const email = document.querySelector(".form_register input[name='email']");
const password = document.querySelector(".form_register input[name='password']");
const confirm_password = document.querySelector(".form_register input[name='confirm_password']");
const phone = document.querySelector(".form_register input[name='phone']");
const accepting = document.querySelector(".form_register input[type='radio']");
btnRegister.onclick = async function(){
    if(!accepting.checked){
        alert("Vui long tich vao I accept all terms & conditions!");
        return;
    }
    if(! await _checkAccountExit()){
        if(password.value == confirm_password.value){
            alert("dang ky thanh cong");
            postUser(nameUser.value, email.value, password.value, confirm_password.value, phone.value);
             window.location.href = "./home.html";
            
        }else{
            alert("mat khau khong trung nhau, vui long nhap lai")
        }
    }else{
        alert("tai khoang da ton tai, vui long nhap lai!");
    }   
}
btnLogin.onclick = () => {
    window.location.href = "/Lib/Page/login.html";    
}
async function postUser(name, email, password, confirm_password, phone){
    fetch(usersAPI, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            phone: phone.trim(),
            img: "/Assets/images/users/default_profile_picture.jpg",
            id_role: 2
        })
    })
}
async function getUsers() {
    try {
      const response = await fetch(usersAPI, {
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
 async function _checkAccountExit(){
    try{
        const data = await getUsers();
        return data.some(e => {
            return e.email == email.value;
        })
    } catch (err) {
    alert(err.message);
  }
}
