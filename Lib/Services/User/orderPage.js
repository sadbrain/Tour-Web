const avt = document.getElementById("profile_avt_link");
const profile_name = document.getElementById("profile_name");
const nameUser = document.getElementById("name_user");

async function showBookings(){
    const user_token = JSON.parse(localStorage.getItem("user_token"));
    // check dang nhap thanh cong hay chua
  if(!user_token){
    return;
  }
    const bookings = await getBookings(user_token.id);
    const user = await getUser(user_token.id);
    avt.src = user.img;
    nameUser.innerHTML = user.name;
    let cardBookingHtml = "";
    if(bookings.length != 0){
        for(let i = 0; i < bookings.length; i++){
            const tour = await getTour(bookings[i].id);
            if(!bookings[i].isBlock){
                cardBookingHtml += `            <div class="bookings-content_container">
                <div class="booking-item-module">
                    <div class="booking-item">
                         <section class="booking-item_icon">
                            <img src="https://res.klook.com/image/upload/v1653640874/ued/platform/2022%20klook%20icon_categories/app/category_experiences_l2_boat_tours_cruises_yachts_bg48.png" alt="活动图标">
                        </section> 
                        <section class="booking-content">
                            <section class="booking-content_wrapper">
                                <div class="booking-content_wrapper--content">
                                    <p class="booking-content_title">
                                        ${tour.name}
                                    </p> 
                                    <p class="booking-content_desc">
                                        ${tour.description}
                                    </p>
                                    <p class="booking-content_desc">
                                        ${bookings[i].booking_date}
                                    </p>
                                    <p class="booking-content_desc">
                                    Người lớn * ${bookings[i].num_of_participants.adults.quantity
                                    }
                                    </p> 
                                    <p class="booking-content_desc">
                                    Trẻ em * ${bookings[i].num_of_participants.childrens.quantity
                                    }
                                    </p> 
    
                                    <p class="booking-content_price">
                                    Cần thanh toán: ${bookings[i].total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                                  </p>
                             </div> 
                            <div class="booking-content_wrapper--image">
                                <div class="booking-content_img" lazy="loaded" style="background-image: url(${tour.img[0]});">
                                </div>
                            </div>
                        </section> 
                        <section class="booking-content_wrapper">
                            <div class="booking-content_wrapper--left">
                                <p class="booking-content_status" style="color: rgb(255, 156, 0);">
                                    Chờ Thanh Toán
                                    <span class="count-down">00:00:00</span>
                                </p> <!----> 
                                <div class="booking-content_option">
                                    <span class="booking-content_option--margin">
                                        <button type="button" class="klk-button klk-button-primary klk-button-small">
                                             <span>
                                                Thanh toán
                                             </span> 
                                        </button>
                                    </span> <!---->
                                </div>
                            </div> <!---->
                        </section>
                    </section>
                </div>
            </div> 
            <div class="bookings-content_pagination"><!----></div>
        </div>`
            }

        }
        document.querySelector(".bookings-content_normal").innerHTML = cardBookingHtml;
    }
}
showBookings()
async function getBookings(userId) {

    try {
      const response = await fetch(bookingsAPI + "?user_id=" + userId, {
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
async function getUser(id) {

    try {
      const response = await fetch(usersAPI + "/" +id, {
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