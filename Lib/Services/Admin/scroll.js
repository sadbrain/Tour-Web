window.addEventListener("scroll", function() {
    var backToTopButton = document.querySelector(".back-to-top");
    
    if (window.scrollY > 200) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
    if(window.scrollY > 10){
        document.querySelector(".topbar-nav nav").classList.add("bg-dark");
    }else{
        document.querySelector(".topbar-nav nav").classList.remove("bg-dark");

    }
  });
  
  document.querySelector(".back-to-top").addEventListener("click", function() {
    window.scrollTo(0, 0);
  });