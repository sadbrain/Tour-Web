// const usersAPI = "http://localhost:3000/users";

async function getUser(id) {

    try {
      const response = await fetch(usersAPI + "?id=" +id, {
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
 async function loadUserProfile() {
    try {
    const user_token = JSON.parse(localStorage.getItem("user_token"));
      // check dang nhap thanh cong hay chua
    if(!user_token){
      return;
    }
    //dang nhap thanh cong check vai tro
    if(user_token.role ==  2){
        const user = await getUser(user_token.id);
        //hide btn login and register
        document.querySelector(".btn-login").style.display = "none";
        document.querySelector(".btn-register").style.display = "none";
        document.querySelector(".user-info-container").style.display = "block";
        //show info user
        document.querySelector(".user-profile img").src = user[0].img;
        document.querySelector(".media .avatar img").src = user[0].img;
        document.querySelector(".media .media-body .user-title").innerHTML = user[0].name;
        document.querySelector(".media .media-body .user-subtitle").innerHTML = user[0].email;
    }else if(user_token.role == 1){
        alert("ban vui long dang xuat va dang nhap lai tai khoan");
        window.location.href = "/Lib/Page/Admin/home.html";
    }
      // Fetch data from the API


    } catch (err) {
      alert(err.message);
    }
  }
  function render(users){
        document.querySelector(".table-responsive tbody").innerHTML = users;
  }
  loadUserProfile();