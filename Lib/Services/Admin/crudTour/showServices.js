servicesHtml = '';
function showServices(services){
    services.forEach(service => {
        servicesHtml += `
        <div class="services mb-3">
            <label class="title">
            Service: ${++countService}
            </label>    
            <input  type="text"  class="form-control mb-3 nameService"  placeholder="${service.title}" >
            <div class="services-type-container">
            `
        service.serviceList.forEach(serviceType => {
            servicesHtml += `  <div class="services-type">
            <input type="text" class=" "  placeholder="${serviceType.name}" >
            <input type="number" class=" "  placeholder="${serviceType.price}">
                    </div>`
        })


        servicesHtml+= `
            </div>
            <button type="button" class="col-6 col-md-3 btn btn-light px-5" onclick="addServicesType(event)">add type services</button>

        </div>`;

    });
    containerServices.innerHTML = servicesHtml;
}

