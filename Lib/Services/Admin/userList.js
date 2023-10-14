
async function getUsers() {
    try {
      const response = await fetch(usersAPI, {
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
      data.forEach(e => {
            usersHtml += `<tr>
                            <td>${i++}</td>
                            <td><img src="${e.img}" class="product-img" alt="product img"></td>
                            <td>${e.name}</td>
                            <td>${e.email}</td>
                            <td>${e.id_role == 1 ? "Admin" : "User"}</td>
                            <td>${e.phone}</td>
                            <td><button class="btn btn-secondary">Edit</button>
                            <button class="btn btn-danger">Delete</button></td>
                         </tr>`
      });
      console.log(usersHtml);
      render(usersHtml);
    } catch (err) {
      alert(err.message);
    }
  }
  function render(users){
        document.querySelector(".table-responsive tbody").innerHTML = users;
  }
  showUsers();