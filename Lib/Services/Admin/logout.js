document.querySelector("#logout").onclick = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/Lib/Page/home.html";
}


