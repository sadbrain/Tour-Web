let bookingid = 0;
const lastname = document.querySelector('#form-confirm-info .form-group  input[name="lastname"]');
const firstname = document.querySelector('#form-confirm-info .form-group  input[name="firstname"]');
const phone = document.querySelector('#form-confirm-info .form-group  input[name="phone"]');
const email = document.querySelector('#form-confirm-info .form-group  input[name="email"]');
async function showInfoComfirm(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var idTour = parseInt(paramsString.split("&")[0].split("=")[1]);
    var idUser = parseInt(paramsString.split("&")[1].split("=")[1]);
console.log(idTour + " " + idUser)
    const bookings = await getBooking();
    // console.log(bookings);
    const booking = bookings.find(booking => {
        return booking.user_id === idUser && booking.tour_id === idTour && booking.status === 1;
    })
    bookingid = booking.id;
    const tour = await getTour(booking.tour_id);
    const user = await getUser(booking.user_id);

    // console.log(tour);
    // console.log(user);

    // console.log(booking);

    document.querySelector(".info-product img").src = tour.img[0];
    document.querySelector(".info-product .product-name").innerHTML = tour.name;  
    //lấy tên những service
    document.querySelector(".nameTour").innerHTML = tour.name;  
    
    let nameService = "";
    booking.services.forEach(service => {
        nameService += service.serviceValue  + " "
    });

    document.querySelector(".info-product .services").innerHTML = nameService;   
    document.querySelector(".servicesName").innerHTML = nameService;   
    document.querySelector(".dateBooking").innerHTML += booking.booking_date;   
    // document.querySelector(".totalBeforeApplyCode").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'}) ;   
    document.querySelector(".totalAfterApplyCode").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})  ;   
    document.querySelector(".confilmPay").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})   ;   

    
    const contact_information = user.contact_information;
    if(contact_information.length !== 0){
      lastname.placeholder = contact_information[0].lastName;
      firstname.placeholder = contact_information[0].firstName;
      phone.placeholder = contact_information[0].phone;
      email.placeholder = contact_information[0].email;
      
    }
}
showInfoComfirm()
async function handleConfirmInfo(lastname, firstname, phone, email){
    lastname.value = lastname.value ? lastname.value : lastname.placeholder;
    firstname.value = firstname.value ? firstname.value : firstname.placeholder;
    phone.value = phone.value ? phone.value : phone.placeholder;
    email.value = email.value ? email.value : email.placeholder;
}
async function getTour(id) {

    try {
      const response = await fetch(toursAPI + "/" +id, {
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

async function getBooking() {
    try {
      const response = await fetch(bookingsAPI, {
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
  async function confilmInfoBooking(){
    const user_token = JSON.parse(localStorage.getItem("user_token"));
    // check dang nhap thanh cong hay chua
    if(!user_token){
      return;
    }
    await handleConfirmInfo(lastname, firstname, phone, email)
    const obj_contact_info = {
        lastName: lastname.value.trim(),
        firstName: firstname.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        food_allergies: document.querySelector('#form-confirm-info  textarea[name="message"]').value.trim(),
        
    }

    const user = await getUser(user_token.id);
    console.log(obj_contact_info);
    const contact_information = user.contact_information;

    // for(let contact of contact_information){
      if(contact_information.length === 0){
       contact_information.push(obj_contact_info) 
      }else{
        contact_information[0] = obj_contact_info;
      }

      await updateContactUser(contact_information, user_token.id)
      console.log(user);

      
    // }

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


async function updateContactUser(contact_information, id){
  try{
    fetch(usersAPI + "/" +id, {
      method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_information  : contact_information,
         })
      });

    alert("đã update thành công");

  }catch(e) {
    alert(e.message);
  }
}
const paymentbtn = document.querySelector(".payment_btn");
paymentbtn.onclick = () => {

  if(bookingid !== 0){
    window.location.href = "./payment.html?id=" + bookingid;

  }
}