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
                initFullscreenLogo();
            });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const scrollIndicator = document.getElementById('scrollIndicator');
        scrollIndicator.addEventListener('click', () => {
            // Scrolls the page down by the height of the window
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        });
      
        window.addEventListener('scroll', () => {
            const videoHeight = document.querySelector('.banner-video').offsetHeight;
            if (window.scrollY > videoHeight) {
                scrollIndicator.style.display = 'none'; // Hide the button
            } else {
                scrollIndicator.style.display = ''; // Show the button again if scrolled back up
            }
        });
      });

      document.addEventListener("DOMContentLoaded", function() {
        window.addEventListener('scroll', function() {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (window.scrollY > 100) { // Check if scrolled more than 100px
                scrollIndicator.classList.add('hide'); // Hide the scroll indicator
            } else {
                scrollIndicator.classList.remove('hide'); // Show it again if scrolled back up
            }
        });
      });

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

    function initFullscreenLogo() {
        const fullscreenLogo = document.getElementById('fullscreen-logo');
    
        function showFullscreenLogo(callback) {
            fullscreenLogo.style.display = 'flex';
            fullscreenLogo.style.opacity = '1';
            setTimeout(() => {
                fullscreenLogo.style.opacity = '0';
                setTimeout(() => {
                    fullscreenLogo.style.display = 'none';
                    callback();
                }, 500); // Adjust the delay as needed
            }, 1000); // Adjust the duration as needed
        }
    
        // Show fullscreen logo on initial load of the home page
        if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
            fullscreenLogo.style.display = 'flex';
            setTimeout(() => {
                showFullscreenLogo(() => {});
            }, 0);
        }
    
        // Add event listener to home link
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.addEventListener('click', function (e) {
                e.preventDefault();
                showFullscreenLogo(() => {
                    window.location.href = 'index.html';
                });
            });
        }
    
        // Add event listener to other links to prevent logo transition
        const otherLinks = document.querySelectorAll('a[href]:not([href="index.html"])');
        otherLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = link.href;
            });
        });
    }
    loadHeaderFooter();
});
