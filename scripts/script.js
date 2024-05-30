document.addEventListener('DOMContentLoaded', function () {
    function loadHeaderFooter() {
        fetch('header-footer.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                const header = doc.querySelector('header');
                const footer = doc.querySelector('footer');

                document.getElementById('header-container').appendChild(header);
                document.getElementById('footer-container').appendChild(footer);
            })
            .then(() => {
                // Ensure the scripts are loaded after header and footer
                initNavigation();
            });
    }

    function initNavigation() {
        const CSbody = document.querySelector('body');
        const CSnavbarMenu = document.querySelector('#cs-navigation');
        const CShamburgerMenu = document.querySelector('#ham-menu + label');
        const hamMenu = document.getElementById('ham-menu');
        const overlayMenu = document.querySelector('.ham-menu');
        const fullPageGreen = document.querySelector('.full-page-green');
        const navButtons = document.querySelectorAll('.cs-nav-button');
        let heroSection = document.querySelector('.hero');

        // Check for hero section on page load
        if (!heroSection) {
            heroSection = document.createElement('div');
            heroSection.style.height = '100px'; // Default height if hero section not present
        }

        // Hamburger menu click event
        if (CShamburgerMenu) {
            CShamburgerMenu.addEventListener('click', function () {
                CShamburgerMenu.classList.toggle('cs-active');
                CSnavbarMenu.classList.toggle('cs-active');
                CSbody.classList.toggle('cs-open');
            });
        }

        // Hamburger menu checkbox change event
        if (hamMenu) {
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
        }

        // Close overlay menu on clicking the full-page green overlay
        if (fullPageGreen) {
            fullPageGreen.addEventListener('click', function () {
                hamMenu.checked = false;
                overlayMenu.style.transform = 'translateX(-100%)';
                overlayMenu.style.visibility = 'hidden';
                fullPageGreen.style.display = 'none';
            });
        }

        // Adjust navigation bar on scroll
        window.addEventListener('scroll', function() {
            const navigation = document.getElementById('cs-navigation');
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;

            if (window.scrollY > heroHeight) {
                navigation.classList.add('scrolled');
                navButtons.forEach(button => button.style.visibility = 'visible');
            } else {
                navigation.classList.remove('scrolled');
                navButtons.forEach(button => button.style.visibility = 'hidden');
            }
        });

        // Hide nav buttons initially
        navButtons.forEach(button => button.style.visibility = 'hidden');

        // Show nav buttons on hover over navigation bar
        CSnavbarMenu.addEventListener('mouseover', function() {
            if (!CSnavbarMenu.classList.contains('scrolled')) {
                navButtons.forEach(button => button.style.visibility = 'visible');
            }
        });

        CSnavbarMenu.addEventListener('mouseout', function() {
            if (!CSnavbarMenu.classList.contains('scrolled')) {
                navButtons.forEach(button => button.style.visibility = 'hidden');
            }
        });
    }

    loadHeaderFooter();
});
