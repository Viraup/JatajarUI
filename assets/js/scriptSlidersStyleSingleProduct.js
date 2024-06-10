var swiper = new Swiper(".slide-container1", {
  slidesPerView: 4,
  spaceBetween: 16,
  sliderPerGroup: 4,
  loop: false,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  rtl: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-prev",
    prevEl: ".swiper-button-next",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.1,
      spaceBetween: 6,
    },
    400: {
      slidesPerView: 1.6,
      spaceBetween: 6,
    },
    600: {
      slidesPerView: 2.5,
      spaceBetween: 8,
    },
    900: {
      slidesPerView: 3.4,
      spaceBetween: 16,
    },
    1060: {
      slidesPerView: 5.2,
      spaceBetween: 16,
    },
  },
});
