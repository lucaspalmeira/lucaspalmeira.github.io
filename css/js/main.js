function initCarousel() {
    const carousel = document.querySelector(".carousel");
    const slides = carousel.querySelector(".slides");
    const controls = carousel.querySelector(".controls");

    let currentSlideIndex = 0;

    controls.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            if (button.classList.contains("prev")) {
                currentSlideIndex = (currentSlideIndex - 1 + 3) % 3;
            } else {
                currentSlideIndex = (currentSlideIndex + 1) % 3;
            }
            showSlide(currentSlideIndex);
        });
    });

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        slides.querySelectorAll(".image").forEach((image, i) => {
            image.classList.remove("active");
            if (i === index) {
                image.classList add("active");
            }
        });
    }

    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % 3;
        showSlide(currentSlideIndex);
    }, 3000);
}

window.addEventListener("load", initCarousel);
