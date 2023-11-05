const idBooking = document.querySelector("#form-edit-booking input[name='id']");
const userName = document.querySelector("#form-edit-booking input[name='user_name']");
const tourName = document.querySelector("#form-edit-booking input[name='tour_name']");
const booking_date = document.querySelector("#form-edit-booking input[name='booking_date']");
const status_booking = document.querySelector("#form-edit-booking input[name='status_booking']");
const total = document.querySelector("#form-edit-booking input[name='total_booking']");
const adult_quantity = document.querySelector("#form-edit-booking input[name='adult_quantity']");
const children_quantity = document.querySelector("#form-edit-booking input[name='children_quantity']");
let services;
let idUser;
let idTour
async function handleShowInfoBooking(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    let booking = await getBooking(id);
    let tour= await getTour(booking[0].tour_id);
    let user= await getUser(booking[0].user_id);
    idUser = booking[0].user_id;
    idTour = booking[0].tour_id;
    let status = await getStatusBooking(booking[0].status);
    services = booking[0].services;

    if(booking){
      // console.log(booking[0])
        idBooking.placeholder = booking[0].id;
        userName.placeholder = user[0].name;
        tourName.placeholder = tour[0].name;
        total.placeholder  = booking[0].total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        booking_date.value = booking[0].booking_date;
        status_booking.placeholder = status[0].name;
        adult_quantity.placeholder = booking[0].num_of_participants.adults.quantity;
        children_quantity.placeholder = booking[0].num_of_participants.childrens.quantity;
    }
        
            
}
handleShowInfoBooking()


function handleEdit(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    // if(confirm("bạn có thật sự muốn xóa!")){
    // console.log(1);
    //   try{
    //     fetch(bookingsAPI + "/" +id, {
    //       method: "PATCH", 
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             isBlock: true,
    //          })
    //       });
    //     window.location.href = "/Lib/Page/Admin/home.html";
  
    //     alert("đã xóa thành công");
  
    //   }catch(e) {
    //     alert(e.message);
    //   }
  
    // }
}



  async function getBooking(id) {

    try {
      const response = await fetch(bookingsAPI + "?id=" +id, {
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

  async function getTour(id){
    try {
      const response = await fetch(toursAPI + "?id=" + id, {
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
  async function getUser(id){
    try {
      const response = await fetch(usersAPI + "?id=" + id, {
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
  async function getStatusBooking(id){
    try {
      const response = await fetch(statusBookingAPI + "?id=" + id, {
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
  function navigateToUserInfo(){
    window.location.href =`../userView/singleUserForm.html?id=${idUser}`;
  }
  function navigateToTourInfo(){
    window.location.href =`../tourView/singleTourForm.html?id=${idTour}`;
  }
//   function navigateToUserInfo(){
    
//   }