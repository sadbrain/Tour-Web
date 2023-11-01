const nameTour = document.querySelector("#form-single-tour input[name='name']");
const description = document.querySelector("#form-single-tour textarea[name='description']");
const price = document.querySelector("#form-single-tour input[name='price']");
const departure_day = document.querySelector("#form-single-tour input[name='departure_day']");
const duration = document.querySelector("#form-single-tour input[name='duration']");
const departure_location = document.querySelector("#form-single-tour input[name='departure_location']");
const destination = document.querySelector("#form-single-tour input[name='destination']");
const categories = document.querySelector("#form-single-tour input[name='categories']");
const idTour = document.querySelector("#form-single-tour input[name='idTour']");
const conatinerImg = document.querySelector("#form-single-tour .container-img");
const priceAdult = document.querySelector("#form-single-tour input[name='adult_price']");
const priceChild = document.querySelector("#form-single-tour input[name='children_price']");
let servicesArray = [];
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
  async function getCategory(id) {

    try {
      const response = await fetch(categoriesAPI + "/" +id, {
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
  async function handleShowInfoTour(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    let tour = await getTour(id);

    if(tour){
        nameTour.placeholder = tour.name;
        description.placeholder = tour.description;
        price.placeholder  =  tour.price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        departure_day.value = tour.departure_day;
        duration.placeholder = tour.duration;
        departure_location.placeholder = tour.departure_location;
        destination.placeholder = tour.destination;
        idTour.placeholder = tour.id;
        priceChild.placeholder = tour.priceChild.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        priceAdult.placeholder = tour.priceAdult.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        let nameCategory = "";
        for(let categoryId of tour.categories){

            let category = await getCategory(categoryId);
            nameCategory += category.name;
            
        }
        categories.placeholder = nameCategory;


    }
    idTour.placeholder = tour.id;
    //xử lý ảnh
    let contentContainer = "";
    for(let imgLink of tour.img){
        contentContainer += `
        <img class="col-5 mt-4 me-3" src="${imgLink}" style="border-radius:10px;">
        `
        
    }
    contentContainer += `                <div class="col-12 mt-3 text-center">

    </div>
  </div> `
  conatinerImg.innerHTML = contentContainer;
  servicesArray = tour.services
    // console.log(servicesArray);  
  }
  
    console.log(servicesArray);  
 handleShowInfoTour()

