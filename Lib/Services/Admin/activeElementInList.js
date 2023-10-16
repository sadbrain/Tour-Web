const listNavs =  document.querySelectorAll(".sidebar-menu li");
console.log(listNavs);
listNavs.forEach((item, index) => {
    item.addEventListener("click", () => {
      listNavs.forEach((li) => {
        li.classList.remove("active");
      });
  
      item.classList.add("active");
    });
  });
 
  
  
  
  