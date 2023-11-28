
const modal = document.querySelector('.modal_services');
const containerServices = document.querySelector("#container-services");
let countService = 0;
function showServices(){
    modal.style.display = 'block';
    servicesHtml = '';
    services.forEach(service => {
        servicesHtml += `
        <div class="services mb-3">
            <label class="title">
            Service: ${++countService}
            </label>    
            <input disabled type="text"  class="form-control mb-3 nameService"  placeholder="${service.title}" >
            <div class="services-type-container">
            `
            servicesHtml += `  <div class="services-type">
            <input disabled type="text" class=" "  placeholder="${service.serviceValue}" >
            <input disabled type="number" class=" "  placeholder="${ parseInt(service.servicePrice).toLocaleString('vi', {style : 'currency', currency : 'VND'})}">
                    </div>`


        servicesHtml+= `
            </div>

        </div>`;

    });
    containerServices.innerHTML = servicesHtml;
}
function exitServicesForm(){
    modal.style.display = 'none';

}