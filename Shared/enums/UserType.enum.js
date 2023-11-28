const UserTypeEnum = {
    Admin: 1,
    User: 2
}
function getUserTypeName(number){
    switch(number) {
        case UserTypeEnum.Admin: 
            return "Admin";
        case UserTypeEnum.User: 
            return "User";
        default:
             return "Guess";
    }
}