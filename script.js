// This script provides smooth scrolling functionality for navigation links
// and handles the toggle behavior for the mobile navigation menu.

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links - a fallback/enhancement for scroll-behavior: smooth CSS property
    // Selects all anchor tags whose href attribute starts with '#' (i.e., internal page links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Add a click event listener to each selected anchor
        anchor.addEventListener('click', function (e) {
            // Prevent the default jump-to-anchor behavior
            e.preventDefault();

            // Get the target element to scroll to from the href attribute
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Check if the target element exists to prevent errors
            if (targetElement) {
                // Scroll to the target element with a smooth animation
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a navigation link
            // This condition checks if the current window width is less than 1024px (Tailwind's 'lg' breakpoint)
            if (window.innerWidth < 1024) {
                const navLinks = document.getElementById('nav-links');
                // If the mobile menu is currently open (not hidden), hide it
                if (!navLinks.classList.contains('hidden')) {
                    navLinks.classList.add('hidden');
                    navLinks.classList.remove('flex'); // Remove flex to ensure it collapses correctly
                }
            }
        });
    });

    // Mobile menu toggle functionality
    // Get references to the mobile menu button and the navigation links container
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.getElementById('nav-links');

    // Add a click event listener to the mobile menu button
    mobileMenuButton.addEventListener('click', () => {
        // Toggle the 'hidden' class to show/hide the navigation links
        navLinks.classList.toggle('hidden');
        // Toggle the 'flex' class to control the display of menu items (column layout for mobile)
        navLinks.classList.toggle('flex');
    });

    // Close mobile menu when clicking anywhere outside the menu or button
    // This provides a better user experience on touch devices and desktop
    document.addEventListener('click', (event) => {
        // Check if the click occurred inside the navigation links or the mobile menu button
        const isClickInsideNav = navLinks.contains(event.target) || mobileMenuButton.contains(event.target);

        // If the click was outside, and it's a small screen, and the menu is currently visible
        if (!isClickInsideNav && window.innerWidth < 1024 && !navLinks.classList.contains('hidden')) {
            // Hide the navigation links
            navLinks.classList.add('hidden');
            navLinks.classList.remove('flex');
        }
    });
});