// const email = document.querySelector("#email");
// const password = document.querySelector("#password");
// const sumbit = document.querySelector("#sumbit");
// document.write(sumbit)
// document.write(email)
// document.write(password)

const usersAPi = "http://localhost:3000/users";
// function login(){
//     alert("start login");
//     handleLogin();
// }
// function handleLogin(){
//     const users = getUsers()
//     console.log(users);
//     users.forEach(element => {
//         if(element.email == email.value){
//             if(element.password == password.value){
//                 alert("đăng nhập thành công");
//             }
//         }
//     });

//     alert("email hoặc password của bạn sai, vùi lòng nhập lại!")

// }
function getUsers(){
      fetch(usersAPi)
        .then(response => response.json())
        .then(function (response) {})
}
var a = getUsers();
console.log(a);