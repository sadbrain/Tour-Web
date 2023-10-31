let url = window.location.href;
var paramsString = url.split("?")[1];
var idTBooking = parseInt(paramsString.split("&")[0].split("=")[1]);
var payedTotal = parseInt(paramsString.split("&")[1].split("=")[1]);

document.querySelector(".momo-qr").src = `http://momofree.apimienphi.com/api/QRCode?phone=0353537180&amount=${payedTotal}&note=${payedTotal.toLocaleString('vi', {style : 'currency', currency : 'VND'})}`;