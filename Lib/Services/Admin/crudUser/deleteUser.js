const nameUser = document.querySelector("#form-delete-user input[name='name']");
const email = document.querySelector("#form-delete-user input[name='email']");
const password = document.querySelector("#form-delete-user input[name='password']");
const phone = document.querySelector("#form-delete-user input[name='phone']");
const idUser = document.querySelector("#form-delete-user input[name='idUser']");
const userAvatar = document.querySelector(".user_avatar");

async function handleDelete (){
  let url = window.location.href;
  var paramsString = url.split("?")[1];
  var id = paramsString.split("=")[1];
  if(confirm("bạn có thật sự muốn xóa!")){
  
    try{
      fetch(usersAPI + "/" +id, {
        method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              isBlock: true,
           })
        });
  window.location.href = "/Lib/Page/Admin/home.html";

      alert("đã xóa thành công");

    }catch(e) {
      alert(e.message);
    }

  }
 

}
async function getUser(id) {

  try {
    const response = await fetch(usersAPI + "/" +id, {
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