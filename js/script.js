"use strict";

const yearEl = document.querySelector(".year");
const btnMobile = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const body = document.body;
const html = document.documentElement;
const allLinks = document.querySelectorAll("a:link");
const sectionHero = document.querySelector(".section-hero");
const phoneIcon = document.querySelector(".phone-button");
const phoneContainer = document.querySelector(".phone-container-sticky");
const numberContainer = document.querySelector(".number-container-sticky");

const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (header.classList.contains("nav-open")) {
      html.classList.toggle("prevent-scrolling");
    }
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link"))
      header.classList.toggle("nav-open");
  });
});

// Sticky navigation //

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHero);

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    phoneContainer.classList.add("shrink");
    numberContainer.classList.add("hidden");
  } else {
    phoneContainer.classList.remove("shrink");
    numberContainer.classList.remove("hidden");
  }
});

phoneIcon.addEventListener("click", () => {
  phoneContainer.classList.toggle("shrink");
  numberContainer.classList.toggle("hidden");
});

// GALLERY //

const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeModal = document.querySelector(".close-modal");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const showMoreButton = document.querySelector(".btn--more-photos");

let currentIndex = 0;
let hammer;

// Open Modal //
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.classList.add("show");
    enableSwipe();
    disableScroll();
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.classList.remove("show");
    disableSwipe();
    enableScroll();
  }
});

function showImage() {
  const imageSrc = galleryImages[currentIndex].src;
  modalImg.src = imageSrc;
}

leftArrow.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});

showMoreButton.addEventListener("click", () => {
  const isMore = showMoreButton.textContent === "Prikaži manje";

  galleryImages.forEach((item, index) => {
    if (index >= 8) {
      item.classList.toggle("show-more");
    }
  });

  showMoreButton.textContent = isMore ? "Prikaži više slika" : "Prikaži manje";
});

function enableSwipe() {
  if (!hammer) {
    hammer = new Hammer(modalImg);

    hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on("swipeleft", () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage();
    });

    hammer.on("swiperight", () => {
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage();
    });
  }
}

function disableSwipe() {
  if (hammer) {
    hammer.off("swipeleft");
    hammer.off("swiperight");
    hammer = null;
  }
}

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

function enableScroll() {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

// MOBILE NAVIGATION //

btnMobile.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  html.classList.toggle("prevent-scrolling");
});
