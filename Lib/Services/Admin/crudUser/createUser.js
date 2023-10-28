const nameUser = document.querySelector("#form-create-user input[name='name']");
const email = document.querySelector("#form-create-user input[name='email']");
const password = document.querySelector("#form-create-user input[name='password']");
const confirm_password = document.querySelector("#form-create-user input[name='confirm_password']");
const phone = document.querySelector("#form-create-user input[name='phone']");

async function create(){
      if(! await _checkAccountExit()){
          if(password.value == confirm_password.value){
              try{
                postUser(nameUser.value, email.value, password.value, phone.value);
              window.location.href = "/Lib/Page/Admin/home.html";
                alert("dang ky thanh cong");                
              }catch(e){
                alert(e.message);
              }

              
          }else{
              alert("mat khau khong trung nhau, vui long nhap lai")
          }
      }else{
          alert("tai khoang da ton tai, vui long nhap lai!");
      }   
  }

  async function postUser(name, email, password, phone){
 
      fetch(usersAPI, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              password: password.trim(),
              phone: phone.trim(),
              img: "/Assets/images/users/default_profile_picture.jpg",
              id_role: 2,
              contact_information: [
      
              ],
              isBlock: false

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