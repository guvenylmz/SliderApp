const carouselTrack = document.querySelector(".carousel_track");
const carouselSliders = Array.from(carouselTrack.children);
const carouselIndacators = document.querySelector(".carousel_indacators");

setTimeout(() => {
  const slideWidth = carouselSliders[0].getBoundingClientRect().width;
  carouselSliders.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
}, 100);

document.getElementById("next_btn").addEventListener("click", () => {
  const currentSlide = document.querySelector(".current_slide");
  const nextSlide = currentSlide.nextElementSibling;

  if (nextSlide) {
    nextSlide.classList.add("current_slide");
    carouselTrack.style.transform = "translateX(-" + nextSlide.style.left + ")";
  } else {
    carouselSliders[0].classList.add("current_slide");
    carouselTrack.style.transform = "translateX(0)";
  }
  currentSlide.classList.remove("current_slide");

  updateDots(1);
});

const prevItem = () => {
  const currentSlide = document.querySelector(".current_slide");
  const prevSlide = currentSlide.previousElementSibling;

  if (prevSlide) {
    prevSlide.classList.add("current_slide");
    carouselTrack.style.transform = "translateX(-" + prevSlide.style.left + ")";
  } else {
    const lastSlide = carouselSliders[carouselSliders.length - 1];
    lastSlide.classList.add("current_slide");
    carouselTrack.style.transform = "translateX(-" + lastSlide.style.left + ")";
  }

  currentSlide.classList.remove("current_slide");

  updateDots(0);
};

const addDots = () => {
  for (let i = 0; i < carouselSliders.length; i++) {
    const dotHtml = `<span class="dot ${
      i == 0 ? "current_slide" : ""
    }" data-id="${i}" onclick="updateDots(null, this)"></span>`;
    carouselIndacators.insertAdjacentHTML("beforeend", dotHtml);
  }
};

const Directions = {
  0: "prev",
  1: "next",
};

const updateDots = (direction, targetItem) => {
  const activeDot = carouselIndacators.querySelector(".current_slide");
  const dots = carouselIndacators.children;
if (!targetItem) {
  if (Directions[direction] == "next") {
    const nextDot = activeDot.nextElementSibling;
    if (nextDot) nextDot.classList.add("current_slide");
    else{
        dots[0].classList.add("current_slide");
    }
  } else if (Directions[direction] == "prev") {
    const prevDot = activeDot.previousElementSibling;
    if (prevDot) prevDot.classList.add("current_slide");
    else {
      dots[dots.length - 1].classList.add("current_slide");
    }
  }
}
else{
targetItem.classList.add("current_slide");
const currentSlide = carouselTrack.querySelector(".current_slide");
currentSlide.classList.remove("current_slide")

const targetSlide = carouselSliders[targetItem.dataset.id];
carouselTrack.style.transform = "translateX(-"+ targetSlide.style.left + ")";
targetSlide.classList.add("current_slide");

}
 activeDot.classList.remove("current_slide");
};


addDots();
