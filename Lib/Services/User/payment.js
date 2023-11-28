const paymentBtn = document.querySelector(".submit_btn");
console.log(paymentBtn);
let totalAmount;
let url = window.location.href;
let paramsString = url.split("?")[1];
let idBooking = parseInt(paramsString.split("=")[1]);
let user;
async function showInfoComfirm(){

    const booking = await getBooking(idBooking);
   
    const tour = await getTour(booking.tour_id);
    user = await getUser(booking.user_id);

    //lấy tên những service
    document.querySelector(".nameTour").innerHTML = tour.name;  
    
    let nameService = "";
    booking.services.forEach(service => {
        nameService += service.serviceValue  + " "
    });

    // document.querySelector(".info-product .services").innerHTML = nameService;   
    document.querySelector(".servicesName").innerHTML = nameService;   
    document.querySelector(".dateBooking").innerHTML += booking.booking_date;   
    // document.querySelector(".totalBeforeApplyCode").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'}) ;   
    document.querySelector(".totalAfterApplyCode").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})  ;   
    document.querySelector(".confilmPay").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})   ;   
    document.querySelector(".submit_price").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})   ;   
    totalAmount = booking.total;
    // const contact_information = user.contact_information;
    // if(contact_information.length !== 0){
    //   lastname.placeholder = contact_information[0].lastName;
    //   firstname.placeholder = contact_information[0].firstName;
    //   phone.placeholder = contact_information[0].phone;
    //   email.placeholder = contact_information[0].email;
      
    // }
}
showInfoComfirm()

async function getBooking(id) {

    try {
      const response = await fetch(bookingsAPI + "/" +id, {
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
paymentBtn.onclick = async () => {
  

  // fetch('https://connect.squareupsandbox.com/v2/payments', {
  //   method: 'POST',
  //   headers: {
  //     'Square-Version': '2023-10-18',
  //     'Authorization': 'Bearer EAAAEC7fX8nxMWXEsP9xFLU-UcISc1rvbEXNdYwZaT0T9LvDvjOs3mEhBoh1FxSZ',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     "amount_money": {
  //       "currency": "USD",
  //       "amount": totalAmount
  //     },
  //     "idempotency_key": "e6c1c3a1-1a8c-42ca-a04a-09680e79a718",
  //     "source_id": "CASH",
  //     "cash_details": {
  //       "buyer_supplied_money": {
  //         "amount": totalAmount,
  //         "currency": "USD" 
  //       }
  //     },
  //     "buyer_email_address": user.email
  //   })
  // })
  window.location.href = `../payByMomo.html?idBooking=${idBooking}&total=${totalAmount}`
}

