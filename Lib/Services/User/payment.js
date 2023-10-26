async function showInfoComfirm(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var idBooking = parseInt(paramsString.split("=")[1]);
console.log(idBooking)
    const booking = await getBooking(idBooking);
    console.log(booking);

    // const booking = bookings.find(booking => {
    //     return booking.user_id === idUser && booking.tour_id === idTour && booking.status === 1;
    // })
    // bookingid = booking.id;
    const tour = await getTour(booking.tour_id);
    // const user = await getUser(booking.user_id);

    // // console.log(user);

    // // console.log(booking);

    // document.querySelector(".info-product img").src = tour.img[0];
    // document.querySelector(".info-product .product-name").innerHTML = tour.name;  
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