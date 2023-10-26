const avt = document.getElementById("profile_avt_link");
const profile_name = document.getElementById("profile_name");
const nameUser = document.getElementById("name_user");
const profile_email = document.getElementById("profile_email");
const profile_phone = document.getElementById("profile_phone");
const profile_password = document.getElementById("profile_password");
const token_id = JSON.parse(localStorage.getItem("user_token"))?.id;

function handleShowInfoUser() {
  fetch(usersAPI + "/" + token_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let user = data;
      if (user) {
        avt.src = user.img;
        nameUser.innerHTML = user.name;
        profile_name.value = user.name;
        profile_email.value = user.email;
        profile_phone.value = user.phone;
        profile_password.value = user.password;
      }
    })
    .catch((err) => {
      alert(err.message);
    });
}
handleShowInfoUser();

async function handleInfoUser(profile_name, email, phone, password) {
  profile_name.value = profile_name.value
    ? profile_name.value
    : profile_name.placeholder;
  profile_email.value = profile_email.value
    ? profile_email.value
    : profile_email.placeholder;
  profile_phone.value = phone.value ? phone.value : phone.placeholder;
  profile_password.value = password.value
    ? password.value
    : password.placeholder;
}

async function handleEdit() {
  await handleInfoUser(
    profile_name,
    profile_email,
    profile_phone,
    profile_password
  );
  try {
    updateUser(
      token_id,
      profile_name.value,
      profile_email.value,
      profile_password.value,
      profile_phone.value
    );

    alert("đã cập nhật thành công!");
  } catch (e) {
    alert(e.message);
  }
}

async function updateUser(id, name, email, password, phone) {
  fetch(usersAPI + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      phone: phone.trim(),
      img: "/Assets/images/users/default_profile_picture.jpg",
      id_role: 2,
      isBlock: false,
    }),
  });
}

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

const btnEdit = document.querySelectorAll("#user-info-form .button");
const inputEdit = document.querySelectorAll("#user-info-form input");

btnEdit.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (inputEdit[index].disabled) {
      button.textContent = "Hoàn thành";
      inputEdit[index].disabled = false;
    } else {
      button.textContent = "Chỉnh sửa";
      inputEdit[index].disabled = true;
    }
  });
});