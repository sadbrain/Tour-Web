window.addEventListener("scroll", function() {
    var backToTopButton = document.querySelector(".back-to-top");
    
    if (window.scrollY > 200) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }

  });

  document.querySelector(".back-to-top").addEventListener("click", function() {
    window.scrollTo(0, 0);
  });