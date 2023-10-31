let url = window.location.href;
let paramsString = url.split("?")[1];
let query = paramsString.split("=")[1];
const textSearch = document.querySelector(".text-search");
textSearch.innerHTML = `Kết quả tìm kiếm của ${decodeURIComponent(query)}`
async function showInfor(){
    tourList = await getTour(query);
    var tourHtml = "";
    
    tourList.forEach((element) => {
        // console.log(element.img);
        if(element.isBlock === false){

            tourHtml += ` <div class="active__halong " onclick="navToDetail(${element.id})">
            <img src="${element.img[0]}" alt="">
            <p>${element.name}</p>
            <h4>${element.description}</h4>
            <div class="grid">
                <p><i class="bi bi-star-fill"></i></p>
                <p>${element.rating} (3,230)  100K+ Đã được đặt</p>
            </div>
            <button>Bán chạy</button>
            <button>Hoàn toàn dễ dàng</button>
            <p class="money">${element.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })} </p>
            <button class="policy">Chính sách đảm bảo về giá</button>
          </div>`; 
        }

      });
      document.querySelector(".tourJs").innerHTML = tourHtml;
      
}
showInfor()
async function getTour(query) {

    try {
      const response = await fetch(toursAPI + `?destination=${query}`, {
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

function navToDetail(id){
    window.location.href="./detail.html?id=" + id;
  
  }