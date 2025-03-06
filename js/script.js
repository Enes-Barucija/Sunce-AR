"use strict";

// Selecting elements
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

// Getting the current year
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Implementing a smooth scrolling animation
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (header.classList.contains("nav-open")) {
      html.classList.toggle("prevent-scrolling");
    }
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scrolling back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link"))
      header.classList.toggle("nav-open");
  });
});

// Sticky navigation

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
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHero);

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    phoneContainer.classList.add("shrink"); // Shrink the container
    numberContainer.classList.add("hidden"); // Hide the number container
  } else {
    phoneContainer.classList.remove("shrink"); // Restore the container
    numberContainer.classList.remove("hidden"); // Show the number container
  }
});

phoneIcon.addEventListener("click", () => {
  phoneContainer.classList.toggle("shrink"); // Restore full size
  numberContainer.classList.toggle("hidden"); // Show the number container
});

/*
// GALLERY //

const slider = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeModal = document.querySelector(".close-modal");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const showMoreButton = document.querySelector(".btn--more-photos");

let currentIndex = 0;

// Open Modal
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.classList.add("show");
  });
});

// Close Modal
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.classList.remove("show");
  }
});

// Show Image
function showImage() {
  const imageSrc = galleryImages[currentIndex].src;
  modalImg.src = imageSrc;
}
// Navigate Left
leftArrow.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

// Navigate Right
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

// MOBILE NAVIGATION //

btnMobile.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  html.classList.toggle("prevent-scrolling");
});

// MOBILE GALLERY //

let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentSlideIndex = 0;
let isDragging = false;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  slider.style.transition = "none";
});

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  currentTranslate = prevTranslate + diff;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener("touchend", () => {
  isDragging = false;

  const slideWidth = slider.offsetWidth;
  const thresholdSlide = slideWidth / 4;

  if (
    currentTranslate - prevTranslate < -thresholdSlide &&
    currentIndex < galleryImages.length - 1
  ) {
    currentIndex++;
  } else if (
    currentTranslate - prevTranslate > thresholdSlide &&
    currentIndex > 0
  ) {
    currentIndex--;
  }

  prevTranslate = -currentIndex * slider.offsetWidth;
  slider.style.transition = "transform 0.3s ease";
  slider.style.transform = `translateX(${prevTranslate}px)`;
});
*/

// GALLERY //

const gallery = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeModal = document.querySelector(".close-modal");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const showMoreButton = document.querySelector(".btn--more-photos");

let currentIndex = 0;

// Open Modal
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.classList.add("show");
  });
});

// Close Modal
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.classList.remove("show");
  }
});

// Show Image
function showImage() {
  const imageSrc = galleryImages[currentIndex].src;
  modalImg.src = imageSrc;
}

// Navigate Left
leftArrow.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

// Navigate Right
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

// MOBILE GALLERY SWIPE (FOR MODAL ONLY) //

let startX = 0;
let startY = 0;
let isDragging = false;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isDragging = true;
  modal.style.transition = "none";
});

modal.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;

  // Lock swipe gesture horizontally if the user is scrolling vertically
  const diffY = Math.abs(currentY - startY);
  const diffX = Math.abs(currentX - startX);

  if (diffY > diffX) {
    isDragging = false; // Cancel horizontal swipe
    return;
  }

  // Prevent vertical scrolling
  e.preventDefault();

  const diff = currentX - startX;

  // Only move the modal image visually (optional)
  modalImg.style.transform = `translateX(${diff}px)`;
});

modal.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  const threshold = 50; // Minimum swipe distance

  // Determine swipe direction
  if (diff < -threshold && currentIndex < galleryImages.length - 1) {
    currentIndex++; // Swipe left
  } else if (diff > threshold && currentIndex > 0) {
    currentIndex--; // Swipe right
  }

  // Reset image transform and show the new image
  modalImg.style.transform = "translateX(0)";
  showImage();
});
