
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
      data.sort((a, b) => b.id - a.id);

      data.forEach(e => {
          if(!e.isBlock){
            usersHtml += `<tr>
                            <td>${e.id}</td>
                            <td><img src="${e.img}" class="product-img" alt="product img"></td>
                            <td>${e.name}</td>
           5                 <td>${e.email}</td>
                            <td>${e.id_role == 1 ? "Admin" : "User"}</td>
                            <td>${e.phone}</td>
                            <td><button class="btn btn-secondary"><a class="text-decoration-none text-light" href="userView/editUserForm.html?id=${e.id}">Edit</a></button>
                            <button class="btn btn-danger"><a class="text-decoration-none text-light" href="userView/deleteUserForm.html?id=${e.id}">Delete</a></button></td>
                         </tr>`
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