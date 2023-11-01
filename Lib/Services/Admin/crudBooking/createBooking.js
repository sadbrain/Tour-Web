const email = document.querySelector("#form-create-booking input[name='email']");
const tourId = document.querySelector("#form-create-booking input[name='tour_id']");
const adult_quantity = document.querySelector("#form-create-booking input[name='adult_quantity']");
const children_quantity = document.querySelector("#form-create-booking input[name='children_quantity']");
let totalService = 0;
async function handleCreate(){
   let arrServices = [];
   let objServices = {
    serviceList: [],
   }
   let user = await getUser(email.value);
   let tour = await getTour(tourId.value);
   let participants = {
    adults: {
        quantity: parseInt(adult_quantity.value),
        totalPrice: parseInt(adult_quantity.value) * tour[0].priceAdult
    }, 
    childrens: {
        quantity: parseInt(children_quantity.value),
        totalPrice: parseInt(children_quantity.value) * tour[0].priceChild
    }   
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
    let listServiecBooking = [];
    let obj = {
        title: "",
        serviceValue: "",
        servicePrice: "",
    }
    arrServices.forEach(element => {

        listServiecBooking.push({
            title : element.title,
            serviceValue : element.serviceList[0].name,
            servicePrice : element.serviceList[0].price
        });
        
         totalService += parseInt(element.serviceList[0].price);
   
        })
    totalService += participants.adults.totalPrice + participants.childrens.totalPrice + tour[0].price;
  
    var ngayHienTai = new Date(); // Tạo một đối tượng Date hiện tại

    var ngay = ngayHienTai.getDate(); // Lấy ngày (1-31)
    var thang = ngayHienTai.getMonth() + 1; // Lấy tháng (0-11), cần cộng thêm 1
    var nam = ngayHienTai.getFullYear(); // Lấy năm (4 chữ số)

    let stringDate =  ngay + "/" + thang + "/" + nam
// console.log(stringDate)
// console.log(listServiecBooking)
// console.log(listServiecBooking)


  

    try{
    postBooking(stringDate, participants, listServiecBooking, user[0].id, tour[0].id, totalService);

    window.location.href = "/Lib/Page/Admin/home.html";
      alert("tạo booking thành công!");                
    }catch(e){
      alert(e.message);
    }
}

async function postBooking(stringDate, participants, services, idUser, idTour, totalService){

    fetch(bookingsAPI, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({
            booking_date: stringDate,
            num_of_participants: participants,
            total: totalService,
            status: 1,
            user_id: idUser,
            tour_id: idTour,
            services: services,
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
// "Gói dịch vụ"s
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
  async function getUser(email){
    try {
      const response = await fetch(usersAPI + "?email=" + email, {
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