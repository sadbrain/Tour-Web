const formBooking = document.querySelector('#form-booking');

function showInforTour(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
fetch(toursAPI+ "/" + id)
.then(response => response.json())
.then(data => {
    document.querySelector(".header__name").innerHTML = data.name;
    document.querySelector("title").innerHTML = data.name;
    document.querySelector(".banner-left img").src =data.img[0];
    document.querySelector(".banner-right img:nth-child(1)").src =data.img[1];
    document.querySelector(".banner-right img:nth-child(2)").src = data.img[2];
    document.querySelector(".booking h3").innerHTML=data.price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });
      document.querySelector(".content2 .description").innerHTML=data.description;
      showServives(data.services, data.priceAdult, data.priceChild)
      // console.log(data)
}
)
const addToCartButton = document.createElement('button');
addToCartButton.className = 'btn btn-primary text-center col-3';
addToCartButton.type = 'button';
addToCartButton.textContent = 'Thêm vào giỏ hàng';
addToCartButton.addEventListener('click', addToCart);
formBooking.appendChild(addToCartButton);
}
showInforTour()

let servicesHtml = "";
function showServives(services, priceAdult, priceChild){

    if(services.length === 0){
        servicesHtml += `
        <div class="form-group" ischecked="false">
          <h3 class="title">Số lượng</h3>
    
            <input isClicked = "false" type="number" placeholder="người lớn" price="${priceAdult}">
            <input isClicked = "false" type="number" placeholder="trẻ em" price="${priceChild}">
            <span class="form-message">Vui lòng chọn dịch vụ này</span>
        </div>
        <div class="total col-4"></div>
          
          <div class="col-12 text-end mt-3">
    

            <button class ="btn btn-primary text-center col-3" type="button" onclick="onsumbit()">thanh toán</button>
            
          </div>`
formBooking.innerHTML = servicesHtml;
        
          return;
    }
     servicesHtml = "";
    services.forEach(service => {
        servicesHtml += `
           <div class="form-group" ischecked = 'false'>
                 <h3 class="title">${service.title}</h3>`
        service.serviceList.forEach(element => {
        servicesHtml += `<input isClicked = "false" type="button" value="${element.name}" price=${element.price}>`
        })

        servicesHtml += ` <span class="form-message">Vui lòng chọn dịch vụ này</span>
                     </div>`

    });

    servicesHtml += `
    <div class="form-group" ischecked="false">
      <h3 class="title">Số lượng</h3>

        <input isClicked = "false" type="number" placeholder="người lớn" price=${priceAdult}>
        <input isClicked = "false" type="number" placeholder="trẻ em" price=${priceChild}>
        <span class="form-message">Vui lòng chọn dịch vụ này</span>
    </div>
    <div class="total col-4"></div>
      
      <div class="col-12 text-end mt-3">
      <button class ="btn btn-primary text-center col-3" type="button" onclick="addToCart()">thanh toán</button>


        <button class ="btn btn-primary text-center col-3" type="button" onclick="onsumbit()">thanh toán</button>
      </div>`
formBooking.innerHTML = servicesHtml;

} 
function addToCart() {
  // Lấy danh sách các dịch vụ đã chọn
  const selectedServices = document.querySelectorAll('input[isClicked="true"]');
  
  // Lấy giá của người lớn và giá của trẻ em
  const priceAdult = document.querySelector('input[placeholder="người lớn"]').getAttribute('price');
  const priceChild = document.querySelector('input[placeholder="trẻ em"]').getAttribute('price');

  // Tạo payload dữ liệu đặt tour
  const bookingData = {
    services: [],
    num_of_participants: {
      adults: {
        quantity: parseInt(document.querySelector('input[placeholder="người lớn"]').value),
        totalPrice: parseInt(priceAdult) * parseInt(document.querySelector('input[placeholder="người lớn"]').value)
      },
      childrens: {
        quantity: parseInt(document.querySelector('input[placeholder="trẻ em"]').value),
        totalPrice: parseInt(priceChild) * parseInt(document.querySelector('input[placeholder="trẻ em"]').value)
      }
    },
    total: 0, // Sẽ được tính toán lại ở dưới
    status: 4,
    user_id: JSON.parse(localStorage.getItem('user_token')).id,
   
  };

  let totalPrice = bookingData.num_of_participants.adults.totalPrice + bookingData.num_of_participants.childrens.totalPrice +650000;
  
  selectedServices.forEach(service => {
    const serviceData = {
      title: service.parentNode.querySelector('.title').textContent,
      serviceValue: service.value,
      servicePrice: parseInt(service.getAttribute('price'))
    };
    bookingData.services.push(serviceData);
    totalPrice += serviceData.servicePrice;
  });

  bookingData.total = totalPrice;

  // Gửi yêu cầu POST đến API
  fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
  .then(response => response.json())
  .then(data => {
    alert("Sản phẩm đã được them vào giỏ hàng")
    // Xử lý phản hồi từ API (nếu cần)
    console.log('Đặt tour thành công:', data);
  })
  .catch(error => {
    console.error('Lỗi khi đặt tour:', error);
  });
}

