function showInforTour(){
    let url = window.location.href;
    var paramsString = url.split("?")[1];
    var id = paramsString.split("=")[1];
    console.log(id)
fetch("http://localhost:3000/tours/"+id)
.then(response => response.json() )
.then(data => {
    console.log(data)
    document.querySelector(".header__name").innerHTML = data.name;
    document.querySelector(".banner-left img").innerHTML.src =data.img[0];
    document.querySelector(".banner-right img:nth-child(1)").innerHTML.src =data.img[1];
    document.querySelector(".banner-right img:nth-child(2)").innerHTML.src = data.img[2];


    document.querySelector(".booking h3").innerHTML=data.price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });

      document.querySelector(".content2 .desecription").innerHTML=data.description;
      
})

}
showInforTour()
