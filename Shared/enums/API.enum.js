const urlAPI = {
    Users: "http://localhost:3000/users",
    Tours: "http://localhost:3000/tours",
}
function getAPIByName(name){
    switch(name) {
        case "Users": 

            return urlAPI.Users;
        case "Tours":
            return urlAPI.Tours;
        default:
             return "Guess";
    }
}
