const containerServices = document.querySelector("#container-services");
let countService = 0;
function addServices(){

    containerServices.innerHTML
    containerServices.innerHTML +=  ` 
        <div class="services mb-3">
            <label class="title">
            Service: ${++countService}
            </label>    
            <input  type="text"  class="form-control mb-3 nameService"  placeholder="Enter title" >
            <div class="services-type-container">
            <div class="services-type">
                <input type="text" class=" "  placeholder="Enter services name" >
                <input type="number" class=" "  placeholder="Enter services price">
            </div>

            </div>
            <button type="button" class="col-6 col-md-3 btn btn-light px-5" onclick="addServicesType(event)">add type services</button>

        </div>`;
}

function addServicesType(event){
    const service = getParent(event.target, '.services');
    const servicesTypeContainer = service.querySelector(".services-type-container");
    servicesTypeContainer.innerHTML += `
            <div class="services-type">
                <input type="text" class=" "  placeholder="Enter services name">
                <input type="number" class=" "  placeholder="Enter services price">
            </div>`;

}
function getParent(element, selector){
    while(element.parentElement){
        if(element.parentElement.matches(selector)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

