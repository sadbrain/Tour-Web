const nameTour = document.querySelector("#form-create-tour input[name='name']");
const description = document.querySelector("#form-create-tour textarea[name='description']");
const price = document.querySelector("#form-create-tour input[name='price']");
const departure_day = document.querySelector("#form-create-tour input[name='departure_day']");
const duration = document.querySelector("#form-create-tour input[name='duration']");
const departure_location = document.querySelector("#form-create-tour input[name='departure_location']");
const destination = document.querySelector("#form-create-tour input[name='destination']");

async function create(){
    try{
        postTour(nameTour.value, description.value, price.value, departure_day.value, duration.value, destination.value, departure_location.value);
      window.location.href = "/Lib/Page/Admin/home.html";
        alert("tạo tour thành công!");                
      }catch(e){
        alert(e.message);
      }
}
async function postTour(name, description, price, departure_day, duration, destination, departure_location){
 
    fetch(toursAPI, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                name: name.trim(),
                description: description.trim(),
                price: price.trim(),
                departure_day: departure_day,
                duration: duration,
                destination: destination.trim(),
                departure_location: departure_location.trim(),
                categories: [3],
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