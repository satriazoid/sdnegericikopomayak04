"use strict";

/* SDN CIKOPOMAYAK 04 - INTERAKSI */

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

function closeMenu() {
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
}

menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileNav.hidden = !isOpen;
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
        closeMenu();
        menuBtn.focus();
    }
});

/* Navbar shadow saat scroll */
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* Animasi muncul saat elemen memasuki viewport */
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
}

/* Sorot menu sesuai bagian aktif */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    const pos = window.scrollY + 140;
    let currentId = "";

    sections.forEach((section) => {
        if (pos >= section.offsetTop) {
            currentId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

/* Form kontak */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.className = "form-status";

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            formStatus.textContent = "Mohon lengkapi semua kolom terlebih dahulu.";
            formStatus.classList.add("error");
            return;
        }

        const nama = contactForm.elements.Nama.value.trim();
        const email = contactForm.elements.Email.value.trim();
        const pesan = contactForm.elements.Pesan.value.trim();

        const subject = encodeURIComponent("Pesan dari " + nama + " - SDN Cikopomayak 04");
        const body = encodeURIComponent("Nama: " + nama + "\nEmail: " + email + "\n\n" + pesan);

        window.location.href =
            "mailto:sdncikopomayak04@gmail.com?subject=" + subject + "&body=" + body;

        formStatus.textContent = "Aplikasi email Anda akan terbuka untuk mengirim pesan ini.";
        formStatus.classList.add("success");
        contactForm.reset();
    });
}
