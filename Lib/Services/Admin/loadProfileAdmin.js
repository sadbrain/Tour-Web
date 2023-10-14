const usersAPI = "http://localhost:3000/users";

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
    if(user_token){
        const user = await getUser(user_token.id);
        document.querySelector(".user-profile img").src = user[0].img;
        document.querySelector(".media .avatar img").src = user[0].img;
        document.querySelector(".media .media-body .user-title").innerHTML = user[0].name;
        document.querySelector(".media .media-body .user-subtitle").innerHTML = user[0].email;
    }else{
        window.location.href = "/Lib/Page/login.html";
        alert("bạn vui lòng đăng nhập");
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