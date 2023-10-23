async function showFormComfilm(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var idTour = parseInt(paramsString.split("&")[0].split("=")[1]);
    var idUser = parseInt(paramsString.split("&")[1].split("=")[1]);
    console.log(idTour);
    console.log(idUser);
    const bookings = await getBooking();
    // console.log(bookings);
    const booking = bookings.find(booking => {
        return booking.user_id === idUser && booking.tour_id === idTour && booking.status === 1;
    })
    const tour = await getTour(booking.tour_id);
    console.log(tour);
    console.log(booking);

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

    d

    

}
showFormComfilm()

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