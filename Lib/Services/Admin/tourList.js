async function getUsers() {
    try {
      const response = await fetch(toursAPI, {
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
 async function showUsers() {
    try {
      // Fetch data from the API
      const data = await getUsers();
      usersHtml = "";
      let i = 1;
      data.forEach(element => {
        if(!element.isBlock){
            usersHtml += `<tr>
                            <td>${i++}</td>
                            <td>${element.name}</td>
                            <td>${element.price} vnd</td>
                            <td>${element.duration} h</td>
                            <td><img src="${element.img[0]}" class="product-img" alt="product img"></td>

                            <td><button class="btn btn-secondary"><a class="text-decoration-none text-light" href="tourView/editTourForm.html?id=${element.id}">Edit</a></button>
                                <button class="btn btn-danger"><a class="text-decoration-none text-light" href="tourView/deleteTourForm.html?id=${element.id}">Delete</a></button></td>           
                                    </tr>`;
        }
      });
      render(usersHtml);
    } catch (err) {
      alert(err.message);
    }
  }
  function render(users){
        document.querySelector(".table-responsive tbody").innerHTML = users;
  }
  showUsers();