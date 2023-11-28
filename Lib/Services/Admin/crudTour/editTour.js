const nameTour = document.querySelector("#form-edit-tour input[name='name']");
const description = document.querySelector("#form-edit-tour textarea[name='description']");
const price = document.querySelector("#form-edit-tour input[name='price']");
const departure_day = document.querySelector("#form-edit-tour input[name='departure_day']");
const duration = document.querySelector("#form-edit-tour input[name='duration']");
const departure_location = document.querySelector("#form-edit-tour input[name='departure_location']");
const destination = document.querySelector("#form-edit-tour input[name='destination']");
const categories = document.querySelector("#form-edit-tour input[name='categories']");
const idTour = document.querySelector("#form-edit-tour input[name='idTour']");
const conatinerImg = document.querySelector("#form-edit-tour .container-img");
const priceAdult = document.querySelector("#form-edit-tour input[name='adult_price']");
const priceChild = document.querySelector("#form-edit-tour input[name='children_price']");
let servicesArray = [];
async function handleShowInfoTour(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    let tour = await getTour(id);
    if(tour){
        nameTour.placeholder = tour[0].name;
        description.placeholder = tour[0].description;
        price.placeholder  =  tour[0].price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        departure_day.value = tour[0].departure_day;
        duration.placeholder = tour[0].duration;
        departure_location.placeholder = tour[0].departure_location;
        destination.placeholder = tour[0].destination;
        idTour.placeholder = tour[0].id;
        priceChild.placeholder = tour[0].priceChild.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        priceAdult.placeholder = tour[0].priceAdult.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        //xử lý categories
        let nameCategory = "";
        for(let categoryId of tour[0].categories){

            let category = await getCategory(categoryId);
            nameCategory += category[0].name;
            
        }
        categories.placeholder = nameCategory;


    }
    idTour.placeholder = tour[0].id;
    //xử lý ảnh
    let contentContainer = "";
    for(let imgLink of tour[0].img){
        contentContainer += `
        <img class="col-5 mt-4 me-3" src="${imgLink}" style="border-radius:10px;">
        `
        
    }
    contentContainer += `                <div class="col-12 mt-3 text-center">
    <button  type="button" class="btn btn-primary col-3">Edit Picture</button>

    </div>
  </div> `
  conatinerImg.innerHTML = contentContainer;
  servicesArray = tour[0].services
  showServices(tour[0].services)

    // userAvatar.src = tour[0].img;
    // deleteFormatCurrency(priceAdult.placeholder);

}
handleShowInfoTour()

async function handleEdit(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    await handleInfoTour(nameTour, description, price, departure_day, duration, destination, departure_location, priceChild, priceAdult);
    // console.log(nameTour.value);
    // console.log(description.value);
    // console.log(price.value);
    // console.log(departure_day.value);
    // console.log(duration.value);
    // console.log(departure_location.value);
    // console.log(destination.value );


    try{
         await updateTour(id, nameTour.value, description.value, price.value, departure_day.value, duration.value, destination.value, departure_location.value, priceChild.value, priceAdult.value, servicesArray);
        window.location.href = "/Lib/Page/Admin/home.html";
       
        alert("đã cập nhật thành công!");
      }catch(e) {
        alert(e.message);
      }
}
async function updateTour(id, nameTour, description, price, departure_day, duration, destination, departure_location, priceChild, priceAdult, servicesArray){
    let tour = await getTour(id);

    fetch(toursAPI + "/" +id, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: nameTour.trim(),
            description: description.trim(),
            price: parseInt(price.trim()),
            departure_day: departure_day,
            duration: duration,
            destination: destination.trim(),
            departure_location: departure_location.trim(),
            categories: tour[0].categories,
            priceAdult: parseInt(priceAdult),
            priceChild: parseInt(priceChild),
            img: tour[0].img,
            services: servicesArray,
            isBlock: false

        })
    })
}
function deleteFormatCurrency(currency){
  let str = "";
  for(var i = 0; i < currency.length - 2; i++){
    
      if(currency[i] != "."){
        str += currency[i]
      }
  }
  return str;

}

async function handleInfoTour(nameTour, description, price, departure_day, duration, destination, departure_location, price_child, price_adult){
    nameTour.value = nameTour.value ? nameTour.value : nameTour.placeholder;
    description.value = description.value ? description.value : description.placeholder;
    price.value = price.value ? price.value : deleteFormatCurrency(price.placeholder);
    departure_day.value = departure_day.value ? departure_day.value : departure_day.placeholder;
    duration.value = duration.value ? duration.value : duration.placeholder;
    departure_location.value = departure_location.value ? departure_location.value : departure_location.placeholder;
    destination.value = destination.value ? destination.value : destination.placeholder;
    price_child.value = price_child.value ? price_child.value : deleteFormatCurrency(price_child.placeholder);
    price_adult.value = price_adult.value ? price_adult.value : deleteFormatCurrency(price_adult.placeholder);

}



async function getCategory(id){
    try {
      const response = await fetch(categoriesAPI + "?id=" + id, {
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