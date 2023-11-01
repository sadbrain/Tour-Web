const nameUser = document.querySelector("#form-delete-user input[name='name']");
const email = document.querySelector("#form-delete-user input[name='email']");
const password = document.querySelector("#form-delete-user input[name='password']");
const phone = document.querySelector("#form-delete-user input[name='phone']");
const idUser = document.querySelector("#form-delete-user input[name='idUser']");
const userAvatar = document.querySelector(".user_avatar");
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
  function handleShowInfoTour(){
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
  handleShowInfoTour()