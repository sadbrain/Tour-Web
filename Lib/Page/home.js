let topCities = [
  {
    id: "1",
    name: "Ha Noi",
    image: "../../Assets/Figma/1.jpg",
  },
  {
    id: "2",
    name: "Hai Phong",
    image: "../../Assets/Figma/2.jpg",
  },
  {
    id: "3",
    name: "Đa Nang",
    image: "../../Assets/Figma/3.jpg",
  },
  {
    id: "4",
    name: "Can Tho",
    image: "../../Assets/Figma/4.jpg",
  },
  {
    id: "5",
    name: "TP Ho Chi Minh",
    image: "../../Assets/Figma/5.jpg",
  },
];

var topCitiesElement = document.getElementById("top-cities");
let htmlContent = "";

htmlContent += `<ul class="navsecond__container">`;
topCities.forEach((city) => {
  htmlContent += `
    <li>
        <img src="${city.image}" alt="">
        <span>${city.name}</span>
    </li>
    `;
});

htmlContent += `</ul>`;
topCitiesElement.innerHTML = htmlContent;

// let hotPlace = [
//   {
//     id: "1",
//     image: "../../Assets/Figma/1.jpg",
//     title: "Vé Cáp Tro Sun World Ba Na Hills Đà Nẵng",
//     description: "Đây là quần thể du lịch nghỉ...",
//   },
//   {
//     id: "2",
//     image: "../../Assets/Figma/2.jpg",
//     title: "Vé Cáp Tro Sun World Ba Na Hills Đà Nẵng",
//     description: "Khám phá một trong nhữ...",
//   },
//   {
//     id: "1",
//     image: "../../Assets/Figma/3.jpg",
//     title: "Vé Cáp Tro Sun World Ba Na Hills Đà Nẵng",
//     description: "Đây là quần thể du lịch nghỉ...",
//   },
// ];

let wherePlace = [
  {
    id: "1",
    image: "../../Assets/Figma/Group58.png",
    name: "TP Hồ Chí ..",
  },
  {
    id: "2",
    image: "../../Assets/Figma/Group60.png",
    name: "Đà Nẵng",
  },
  {
    id: "3",
    image: "../../Assets/Figma/Group61.png",
    name: "TP Hồ Chí ..",
  },
  {
    id: "4",
    image: "../../Assets/Figma/Group62.png",
    name: "Hà Nội",
  },
  {
    id: "5",
    image: "../../Assets/Figma/Group64.png",
    name: "Hội An",
  },
  {
    id: "6",
    image: "../../Assets/Figma/Group64.png",
    name: "Hội An",
  },
];
var wherePlaceElement = document.getElementById("where-place");
var html1 = "";

wherePlace.forEach((place) => {
  html1 += `
    <div class="where__item col-sm-2">
        <div class="where__background" style=" background-image: url(${place.image});width:190px;" >
            <p class="where__p">${place.name}</p>
        </div>
    </div>
    `;
});
wherePlaceElement.innerHTML = html1;

var tourHtml = "";

fetch("http://localhost:3000/tours")
  .then(function (posts) {
    return posts.json();
  })
  .then((data) => {
    // console.log(data);

    data.forEach((element) => {
      // console.log(element.img);
      tourHtml += ` <div class="active__halong " onclick="navToDetail(${element.id})">
          <img src="${element.img[0]}" alt="">
          <p>${element.name}</p>
          <h4>${element.description}</h4>
          <div class="grid">
              <p><i class="bi bi-star-fill"></i></p>
              <p>4.7 (3,230)  100K+ Đã được đặt</p>
          </div>
          <button>Bán chạy</button>
          <button>Hoàn toàn dễ dàng</button>
          <p class="money">${element.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })} </p>
          <button class="policy">Chính sách đảm bảo về giá</button>
        </div>`;
    });
    document.querySelector(".tourJs").innerHTML = tourHtml;
  });

let tourExper = [
  {
    id: "1",
    image: "../../Assets/Figma/Tour1.png",
    title: "Chốt Gấp Kèo Đi TP - HCM",
    description: "Deal du lịch HOT nhất miền Nam Việt Nam",
  },
  {
    id: "2",
    image: "../../Assets/Figma/Tour2.png",
    title: "Chốt Gấp Kèo Đi TP - HCM",
    description: "Deal du lịch HOT nhất miền Nam Việt Nam",
  },
  {
    id: "3",
    image: "../../Assets/Figma/Tour3.png",
    title: "Chốt Gấp Kèo Đi TP - HCM",
    description: "Deal du lịch HOT nhất miền Nam Việt Nam",
  },
];

var tourExperElement = document.getElementById("tour-experience");

let html2 = "";

tourExper.forEach((experience) => {

html2 += `<div class="Tour col-sm-4">
                    <div class="Tour__background" style=" background-image: url(${experience.image});width: 410px;">
                      <div class="Tour__content">
                        <p class="Tour__content_p">${experience.title}</p>
                        <p class="Tour__content_p1">${experience.description}</p>
                      </div>
                      <button class="Tour__button" type="button">Khám phá</button>
                    </div>
                  </div>
    `;
});

tourExperElement.innerHTML = html2;
function navToDetail(id){
  window.location.href="./detail.html?id=" + id;

}
// nhấn vào hiển thị trang detail
