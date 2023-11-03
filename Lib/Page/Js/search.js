const btnSearchByAction = document.querySelector('.mainnav__search input');
const iconSearchByAction = document.querySelector('.mainnav__search i');
let tourList = [];

iconSearchByAction.onclick = async () => {
    if(btnSearchByAction.value === "") {
        return;
    }
    tourList = await getTour(btnSearchByAction.value);
    // console.log(tourList);
    if(tourList.length === 0){
        alert("không tìm thấy phần tử");
    }
    else{
        window.location.href = `./tourList.html?query=${btnSearchByAction.value}`;

    }
} 
async function getTour(query) {

    try {
      const response = await fetch(toursAPI + `?destination=${query}`, {
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