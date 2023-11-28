document.querySelector("#logout").onclick = () => {
    localStorage.removeItem("user_token");
    //hiển thị nút đăng ky and đăng nhập và ẩn đi user-avatar-container
    document.querySelector(".btn-login").style.display = "block";
    document.querySelector(".btn-register").style.display = "block";
    document.querySelector(".user-info-container").style.display = "none";
    window.location.href = "/Lib/Page/home.html";

}


