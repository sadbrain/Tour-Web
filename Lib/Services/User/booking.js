const formGroups = formBooking.querySelectorAll('.form-group');
let totalService = "";
let string = document.querySelector("#section-right .booking h3").innerHTML.split("&")[0]
for(let e of string){

    if(e!=="."){

        totalService+= e
    }
    
}
totalService =  parseInt(totalService)
let adultCurrents= 0;
let childrentCurrents = 0;
let totalCurrencyAdult = 0;
let totalCurrencyChildren = 0;
formGroups.forEach(formGroup => {
    const inputBtns = formGroup.querySelectorAll('.form-group input[type="button"]');
    const inputNums = formGroup.querySelectorAll('.form-group input[type="number"]');
    inputBtns.forEach(input => {
        input.onclick = handleBooking
    })
    inputNums.forEach(input => {
        input.onchange = handleParticipants
        input.onblur = function(event){
            if(event.target.placeholder === "người lớn"){
                totalCurrencyAdult = adultCurrents * parseInt(event.target.getAttribute("price"));
            }else{
                totalCurrencyChildren = childrentCurrents * parseInt(event.target.getAttribute("price"));

            }
    formBooking.querySelector(".total").innerHTML = (totalService + totalCurrencyAdult + totalCurrencyChildren).toLocaleString('vi', {style : 'currency', currency : 'VND'});

    // console.log("totalCurrencyAdult " + totalCurrencyAdult);
    // console.log("totalCurrencyChildren " + totalCurrencyChildren);
    // console.log("totalService " + totalService);

        }
    })
})


function handleBooking(event) {
    formGroups.forEach(formGroup => {
        const formMessage = formGroup.querySelector(".form-message");
        formMessage.style.display = "none"; 
})

    const formGroup = getParent(event.target, '.form-group')
    formGroup.setAttribute("ischecked", "true")


    if(event.target.getAttribute("isClicked") === "true"){
        totalService -= parseInt(event.target.getAttribute('price'));
        event.target.classList.remove('btnIsClick');
        event.target.setAttribute("isClicked","false");        
        formGroup.setAttribute("ischecked", "false");
        formBooking.querySelector(".total").innerHTML = (totalService + totalCurrencyAdult + totalCurrencyChildren).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        return
    }


    const inputs = formGroup.querySelectorAll('.form-group input[type="button"]');
    inputs.forEach(input => {
        if(input.getAttribute("isClicked") === "true"){
            totalService -= parseInt(input.getAttribute('price'));
            input.classList.remove('btnIsClick');

            input.setAttribute("isClicked","false");
        }
    })
    totalService += parseInt(event.target.getAttribute('price'));
    event.target.classList.add('btnIsClick');
    event.target.setAttribute("isClicked", "true");

    formBooking.querySelector(".total").innerHTML = (totalService + totalCurrencyAdult + totalCurrencyChildren).toLocaleString('vi', {style : 'currency', currency : 'VND'});

    
}

function getParent(element, selector){
    while(element.parentElement){
        if(element.parentElement.matches(selector)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
    
// formBooking.onsubmit = function(event){
//     event.preventDefault(); 
// console.log(1);

// }
function handleParticipants(event){
    const currencyOfCurrent = event.target.value * parseInt(event.target.getAttribute("price"));
    const formGroup = getParent(event.target, '.form-group');
    const formMessage = formGroup.querySelector(".form-message");

    if(event.target.value > 0){
        if(event.target.placeholder === "người lớn"){
            adultCurrents = event.target.value;
        }else{
            childrentCurrents = event.target.value;
        }
        formMessage.style.display = "none"; 
        formGroup.setAttribute("ischecked", "true");
        formMessage.textContent = "Vui lòng cho biết số người tham gia";
        totalParticipant = currencyOfCurrent;
    }else{
        formMessage.textContent = "giá trị nhập vào nên > 0";
        formMessage.style.display = "block"; 
    }
    formBooking.querySelector(".total").innerHTML = (totalService + totalCurrencyAdult + totalCurrencyChildren + currencyOfCurrent).toLocaleString('vi', {style : 'currency', currency : 'VND'});
    // console.log(totalService);

}
function onsumbit(){
    const user_token = JSON.parse(localStorage.getItem("user_token"));
    // check dang nhap thanh cong hay chua
  
  if(!user_token) {
    alert("bạn vui lòng đăng nhập để thực hiện chức năng này");
    window.location.href = "/Lib/Page/login.html";
    return;
  }
    let isValid = true;
    formGroups.forEach(formGroup => {
        if(formGroup.getAttribute("ischecked") === "false"){
            const formMessage = formGroup.querySelector(".form-message");
            formMessage.style.display = "block"; 
            isValid = false;
        }
    })


    if(isValid){
        let services = [];
        let participants = {
            adults: {
                quantity: 0,
                totalPrice: 0
            }, 
            childrens: {
                quantity: 0,
                totalPrice: 0
            }   
        }
        formGroups.forEach(formGroup => {
            const title = formGroup.querySelector(".title");
            const inputBtns = formGroup.querySelectorAll('.form-group input[type="button"]');
            const inputNums = formGroup.querySelectorAll('.form-group input[type="number"]');
            
            inputBtns.forEach(input => {
                if(input.getAttribute("isClicked") == "true") {
                    const service = {
                        title: title.innerHTML,
                        serviceValue: input.value, 
                        servicePrice: input.getAttribute("price")
                }
                services.push(service)
                    
                }
            })

            inputNums.forEach(input => {
                if(input.placeholder ==="người lớn"){
                    participants.adults.quantity =  parseInt(input.value);
                    participants.adults.totalPrice =  totalCurrencyAdult;
                    totalService += parseInt(input.value *  input.getAttribute("price"));
                }else{
                    if(input.value){
                        participants.childrens.quantity =  parseInt(input.value);
                        participants.childrens.totalPrice =  totalCurrencyChildren;
                        totalService += parseInt(input.value *  input.getAttribute("price"));

                    }

                }
            })

        })
    

        // console.log(services);
        // console.log(participants);
        var ngayHienTai = new Date(); // Tạo một đối tượng Date hiện tại

        var ngay = ngayHienTai.getDate(); // Lấy ngày (1-31)
        var thang = ngayHienTai.getMonth() + 1; // Lấy tháng (0-11), cần cộng thêm 1
        var nam = ngayHienTai.getFullYear(); // Lấy năm (4 chữ số)

        let stringDate =  ngay + "/" + thang + "/" + nam


        let url = window.location.href;
        var paramsString = url.split("?")[1];
        var idTour = paramsString.split("=")[1];
        // console.log(totalService);
        try{
            postBooking(stringDate, participants, services, user_token.id, parseInt(idTour), totalService);
            // console.log(stringDate);
            // console.log(participants);
            // console.log(services);
            // console.log(user_token.id);
            // console.log(idTour);
            // console.log(totalService);
    window.location.href = "./User/comfilmInfoBooking.html?idTour=" + idTour+"&idUser=" + user_token.id;

        }catch(e){
            alert(e.message);
          }

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