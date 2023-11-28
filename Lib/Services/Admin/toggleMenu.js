// toggle menu
document.querySelector(".toggle-menu").onclick = () => {
    document.querySelector('#wrapper').classList.toggle('toggled');
    document.querySelector('.toggle-menu i').classList.toggle('content-wrapper');
}

document.querySelector(".dropdown-toggle").onclick = () => {
    document.querySelector('.dropdown-menu-right').classList.toggle('show');
}

