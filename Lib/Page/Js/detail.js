const formBooking = document.querySelector('#form-booking');

function showInforTour(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
fetch(toursAPI+ "/" + id)
.then(response => response.json() )
.then(data => {
    document.querySelector(".header__name").innerHTML = data.name;
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
})

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
    
            <button class ="btn btn-primary text-center col-3" type="button" onclick="addToCart()">thêm vào giỏ hàng</button>
        
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
        servicesHtml += `<input isClicked = "false" type="button" value="${element.name}" price="${element.price}">`
        })

        servicesHtml += ` <span class="form-message">Vui lòng chọn dịch vụ này</span>
                     </div>`

    });

    servicesHtml += `
    <div class="form-group" ischecked="false">
      <h3 class="title">Số lượng</h3>

        <input isClicked = "false" type="number" placeholder="người lớn" price="${priceAdult}">
        <input isClicked = "false" type="number" placeholder="trẻ em" price="${priceChild}">
        <span class="form-message">Vui lòng chọn dịch vụ này</span>
    </div>
    <div class="total col-4"></div>
      
      <div class="col-12 text-end mt-3">

        <button class ="btn btn-primary text-center col-3" type="button" onclick="addToCart()">thêm vào giỏ hàng</button>

        <button class ="btn btn-primary text-center col-3" type="button" onclick="onsumbit()">thanh toán</button>
      </div>`
formBooking.innerHTML = servicesHtml;

} 