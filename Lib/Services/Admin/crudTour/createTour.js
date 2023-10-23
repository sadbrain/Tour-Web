const nameTour = document.querySelector("#form-create-tour input[name='name']");
const description = document.querySelector("#form-create-tour textarea[name='description']");
const price = document.querySelector("#form-create-tour input[name='price']");
const departure_day = document.querySelector("#form-create-tour input[name='departure_day']");
const duration = document.querySelector("#form-create-tour input[name='duration']");
const departure_location = document.querySelector("#form-create-tour input[name='departure_location']");
const destination = document.querySelector("#form-create-tour input[name='destination']");
const priceChild = document.querySelector("#form-create-tour input[name='adult_price']");
const priceAdult = document.querySelector("#form-create-tour input[name='children_price']");
    
async function create(){
   let arrServices = [];
   let objServices = {
    serviceList: [],
   }
    
    const services = containerServices.querySelectorAll(".services");
    services.forEach(service => {
      const title = service.querySelector(".nameService");
      if(title.value === ""){
        return;
      }
      const servicesTypes = service.querySelectorAll(".services-type")
      servicesTypes.forEach(serviceType => {
        const nameServiceType = serviceType.querySelector("input[type='text']");
        const price = serviceType.querySelector("input[type='number']");
        if(nameServiceType.value === "" || price.value === ""){
          return;
        }
        const obj = {
          name: nameServiceType.value.trim(),
          price: price.value.trim()
        }
      
        objServices.serviceList.push(obj);

        // console.log(objServices);

      })
      objServices.title = title.value.trim();
      arrServices.push(objServices)
      objServices = {
        serviceList: [],

      }
    })

    // console.log(arrServices)
    // arrServices.forEach(Element => {
    //   console.log(Element.serviceList.price)
    // })

    try{
      postTour(nameTour.value, description.value, price.value, departure_day.value, duration.value, destination.value, departure_location.value, arrServices, priceAdult.value, priceChild.value);
    window.location.href = "/Lib/Page/Admin/home.html";
      alert("tạo tour thành công!");                
    }catch(e){
      alert(e.message);
    }
}
async function postTour(name, description, price, departure_day, duration, destination, departure_location, arrServices, priceAdult, priceChild){
 
    fetch(toursAPI, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                name: name.trim(),
                description: description.trim(),
                price: price.trim(),
                priceAdult: priceAdult,
                priceChild: priceChild,
                departure_day: departure_day,
                duration: duration,
                destination: destination.trim(),
                departure_location: departure_location.trim(),
                categories: [3],
                services: arrServices,
                img: [
                    "/Assets/images/locations/italy/rome/licensed-image.jpg",
                    "/Assets/images/locations/italy/rome/licensed-image.jpg",
                    "/Assets/images/locations/italy/rome/licensed-image.jpg",
                    "/Assets/images/locations/italy/rome/licensed-image.jpg"
                ],
                isBlock: false

        })
    })
}

// servicePrice
// : 
// "10000"
// serviceValue
// : 
// "Vé 1 Ngày (Safari Park + Marine Park)"
// title
// : 
// "Gói dịch vụ"