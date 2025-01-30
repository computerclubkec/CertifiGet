const currentPath = window.location.pathname;

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.getAttribute('href') == currentPath){
        link.classList.add('bg-gray-700');
        link.classList.add('font-bold')
        link.classList.add('border-2')
    }
        

})
