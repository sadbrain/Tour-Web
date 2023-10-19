const nameUser = document.querySelector("#form-edit-user input[name='name']");
const email = document.querySelector("#form-edit-user input[name='email']");
const password = document.querySelector("#form-edit-user input[name='password']");
const phone = document.querySelector("#form-edit-user input[name='phone']");
const idUser = document.querySelector("#form-edit-user input[name='idUser']");

const userAvatar = document.querySelector(".user_avatar");
function handleShowInfoUser(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    fetch(usersAPI + "?id=" + id,{
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => response.json())
      .then(data =>{
         let user = data;
         if(user){
            idUser.placeholder = user[0].id;
            nameUser.placeholder = user[0].name;
            email.placeholder = user[0].email;
            phone.placeholder  = user[0].phone;
            password.placeholder = user[0].password;
            userAvatar.src = user[0].img;
         }
      }).catch(err =>{
        alert(err.message);
      })

}
handleShowInfoUser()
async function handleEdit(){

    if(email.value){
        if(await _checkAccountExit()){
            alert("tai khoang da ton tai, vui long nhap lai!");
            return; 
        }

    }
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    await handleInfoUser(nameUser, email, phone, password);
    try{
      updateUser(id, nameUser.value, email.value, password.value, phone.value);
    window.location.href = "/Lib/Page/Admin/home.html";
     
      alert("đã cập nhật thành công!");
    }catch(e) {
      alert(e.message);
    }
  

}
  async function handleInfoUser(nameUser, email, phone, password){
    nameUser.value = nameUser.value ? nameUser.value : nameUser.placeholder;
    email.value = email.value ? email.value : email.placeholder;
    phone.value = phone.value ? phone.value : phone.placeholder;
    password.value = password.value ? password.value : password.placeholder;
}
  async function updateUser(id, name, email, password, phone){
      fetch(usersAPI + "/" +id, {
          method: "PUT",
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
              return e.email == email.value.trim();;
          })
      } catch (err) {
      alert(err.message);
    }
  }