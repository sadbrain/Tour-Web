
async function showBookings() {
    try {
      // Fetch data from the API
      const bookings = await getBookings();
      bookings.sort((a, b) => b.id - a.id);
        
      let bookingsHtml = "";
      for(let booking of bookings) {
        if(!booking.isBlock){
            const user = await getUser(booking.user_id);
            const tour = await getTour(booking.tour_id);
            const status_booking = await getStatusBooking(booking.status);
            bookingsHtml += `<tr>
                            <td>${booking.id}</td>
                            <td>${user[0].email}</td>
                            <td>${tour[0].name}</td>
                            <td><img src="${tour[0].img[0]}" class="product-img" alt="product img"></td>
                            <td>${booking.booking_date}</td>
                            <td>${booking.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                            <td>${status_booking[0].name}</td>
                            <td><button class="btn btn-secondary"><a class="text-decoration-none text-light" href="bookingView/editBookingForm.html?id=${booking.id}">Edit</a></button>
                            <button class="btn btn-danger"><a class="text-decoration-none text-light" href="bookingView/deleteBookingForm.html?id=${booking.id}">Delete</a></button></td>
                         </tr>`
            
          }
      }
    //   <td>${booking.num_of_participants}</td>
      render(bookingsHtml);
    } catch (err) {
      alert(err.message);
    }
  }
  function render(bookings){
        document.querySelector(".table-responsive tbody").innerHTML = bookings;
  }
  showBookings();

async function getBookings() {
    try {
      const response = await fetch(bookingsAPI, {
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
      const response = await fetch(usersAPI + "?id=" +id, {
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
  async function getStatusBooking(id){
    try {
      const response = await fetch(statusBookingAPI + "?id=" + id, {
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