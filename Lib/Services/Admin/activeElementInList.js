const listNavs =  document.querySelectorAll(".sidebar-menu li");
listNavs.forEach((item, index) => {
    item.addEventListener("click", () => {
      listNavs.forEach((li) => {
        li.classList.remove("active");
      });
  
      item.classList.add("active");
    }); 
  });
 
  
  
  
  