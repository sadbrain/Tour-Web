function saveServices(){
    let arrServices = [];
    let objServices = {
        serviceList: [],
    }
        
        const services = containerServices.querySelectorAll(".services");
        services.forEach(service => {
        const title = service.querySelector(".nameService");
        if(title.value === "" && title.placeholder === "Enter title"){
            return;
        }
        title.value = title.value ? title.value : title.placeholder;
        const servicesTypes = service.querySelectorAll(".services-type")
        servicesTypes.forEach(serviceType => {
            const nameServiceType = serviceType.querySelector("input[type='text']");
            const price = serviceType.querySelector("input[type='number']");
            if((nameServiceType.value === ""  && nameServiceType.placeholder === "Enter services name")){
            return;
            }
            if((price.value === ""  && price.placeholder === "Enter services price")){
                return;
            }
        nameServiceType.value = nameServiceType.value ? nameServiceType.value : nameServiceType.placeholder;
        price.value = price.value ? price.value : price.placeholder;

            const obj = {
            name: nameServiceType.value.trim(),
            price: price.value.trim()
            }
        
            objServices.serviceList.push(obj);

            // console.log(objServices);

        })
        objServices.title = title.value.trim();
        arrServices.push(objServices)
        objServices = {
            serviceList: [],

        }
        })
    servicesArray = arrServices;
    // console.log(servicesArray);
    modal.style.display = 'none';
}

