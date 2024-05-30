document.addEventListener('DOMContentLoaded', function () {
    const CSbody = document.querySelector('body');
    const CSnavbarMenu = document.querySelector('#cs-navigation');
    const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');
    const hamMenu = document.getElementById('ham-menu');
    const overlayMenu = document.querySelector('.ham-menu');
    const fullPageGreen = document.querySelector('.full-page-green');
    const heroSection = document.querySelector('.hero');

    // Hamburger menu click event
    CShamburgerMenu.addEventListener('click', function () {
        CShamburgerMenu.classList.toggle('cs-active');
        CSnavbarMenu.classList.toggle('cs-active');
        CSbody.classList.toggle('cs-open');
    });

    // Hamburger menu checkbox change event
    hamMenu.addEventListener('change', function () {
        if (hamMenu.checked) {
            overlayMenu.style.transform = 'translateX(0)';
            overlayMenu.style.visibility = 'visible';
            fullPageGreen.style.display = 'block';
        } else {
            overlayMenu.style.transform = 'translateX(-100%)';
            overlayMenu.style.visibility = 'hidden';
            fullPageGreen.style.display = 'none';
        }
    });

    // Close overlay menu on clicking the full-page green overlay
    fullPageGreen.addEventListener('click', function () {
        hamMenu.checked = false;
        overlayMenu.style.transform = 'translateX(-100%)';
        overlayMenu.style.visibility = 'hidden';
        fullPageGreen.style.display = 'none';
    });

    // Adjust navigation bar on scroll
    window.addEventListener('scroll', function() {
        const navigation = document.getElementById('cs-navigation');
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection.offsetHeight;

        if (window.scrollY > heroHeight) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
});
