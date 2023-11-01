let url = window.location.href;
var paramsString = url.split("?")[1];
var idBooking = parseInt(paramsString.split("&")[0].split("=")[1]);
var payedTotal = parseInt(paramsString.split("&")[1].split("=")[1]);


async function showInfoBooking(){
    document.querySelector(".momo-qr").src = `http://momofree.apimienphi.com/api/QRCode?phone=0353537180&amount=${payedTotal}&note=${payedTotal.toLocaleString('vi', {style : 'currency', currency : 'VND'})}`;
    const booking = await getBooking(idBooking);
    const tour = await getTour(booking.tour_id);
    document.querySelector(".receipt > span").innerHTML = "Mama travel";
    document.querySelector(".total").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    document.querySelector(".total").innerHTML = booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    document.querySelector(".name_order").innerHTML = tour.name;
}
showInfoBooking()
async function getBooking(id) {

    try {
      const response = await fetch(bookingsAPI + "/" +id, {
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