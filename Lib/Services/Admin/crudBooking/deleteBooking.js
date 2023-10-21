// const nameTour = document.querySelector("#form-delete-booking input[name='name']");
// const description = document.querySelector("#form-delete-booking textarea[name='description']");
// const price = document.querySelector("#form-delete-booking input[name='price']");
// const departure_day = document.querySelector("#form-delete-booking input[name='departure_day']");
// const duration = document.querySelector("#form-delete-booking input[name='duration']");
// const departure_location = document.querySelector("#form-delete-booking input[name='departure_location']");
// const destination = document.querySelector("#form-delete-booking input[name='destination']");
// const categories = document.querySelector("#form-delete-booking input[name='categories']");
// const idTour = document.querySelector("#form-delete-booking input[name='idTour']");
// const conatinerImg = document.querySelector("#form-delete-booking .container-img");


// async function handleShowInfoTour(){
//     let url = window.location.href;
//     var paramsString = url.split("?")[1];
//     var id = paramsString.split("=")[1];
//     let tour = await getTour(id);
//     console.log(tour.name);
//     if(tour){
//         nameTour.placeholder = tour.name;
//         description.placeholder = tour.description;
//         price.placeholder  = tour.price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
//         departure_day.value = tour.departure_day;
//         duration.placeholder = tour.duration;
//         departure_location.placeholder = tour.departure_location;
//         destination.placeholder = tour.destination;
//         idTour.placeholder = tour.id;
        
//         //xử lý categories
//         let nameCategory = "";
//         for(let categoryId of tour.categories){

//             let category = await getCategory(categoryId);
//             nameCategory += category.name;
            
//         }
//         categories.placeholder = nameCategory;


//     }
//     idTour.placeholder = tour.id;
//     //xử lý ảnh
//     let contentContainer = "";
//     for(let imgLink of tour.img){
//         contentContainer += `
//         <img class="col-5 mt-4 me-3" src="${imgLink}" style="border-radius:10px;">
//         `
        
//     }
//     contentContainer += `                <div class="col-12 mt-3 text-center">
//     <button class="btn btn-primary col-3">Edit Picture</button>

//     </div>
//   </div> `
//   conatinerImg.innerHTML = contentContainer;
//     // userAvatar.src = tour.img;
            
// }
// handleShowInfoTour()


function handleDelete(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    if(confirm("bạn có thật sự muốn xóa!")){
    
      try{
        fetch(bookingsAPI + "/" +id, {
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
async function getBookings() {
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