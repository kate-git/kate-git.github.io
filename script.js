/* ---------------------- MODEL-VIEWER PROGRESS BAR ---------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.querySelector('#island');
  if (!viewer) return;

  const progressBar = viewer.querySelector('.model-progress-bar');
  const updateBar = viewer.querySelector('.model-update-bar');

  viewer.addEventListener('progress', (event) => {
    const p = event.detail.totalProgress;

    if (updateBar) {
      updateBar.style.width = (p * 100) + '%';
    }

    if (p === 1) {
      progressBar?.classList.add("hide");
    } else {
      progressBar?.classList.remove("hide");
    }
  });

  // Hotspots interactions
  viewer.querySelectorAll('.Hotspot').forEach(h => {
    h.addEventListener('click', () => {
      if (h.dataset.orbit) viewer.cameraOrbit = h.dataset.orbit;
      if (h.dataset.target) viewer.cameraTarget = h.dataset.target;
      if (h.dataset.fov) viewer.fieldOfView = h.dataset.fov;
    });
  });
});


/* ---------------------- SLIDES / PROGRESS BAR ---------------------- */

let currentSlide = 1;
const totalSlides = 6;

function updateProgressBar(progress) { 
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const safeProgress = Math.min(progress, 100); 
        progressBar.style.width = safeProgress + '%';
    }
}

function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = scrollHeight - windowHeight;
    const currentScroll = window.scrollY;

    let progressPercentage = 0;

    if (maxScroll > 0) {
        progressPercentage = (currentScroll / maxScroll) * 100;
    }

    updateProgressBar(progressPercentage); 

    const slides = document.querySelectorAll('.slide');
    const scrollPosition = currentScroll + windowHeight / 2;
    let newCurrentSlide = 1; 

    slides.forEach((slide, index) => {
        const top = slide.offsetTop;
        const bottom = top + slide.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
            newCurrentSlide = index + 1;
        }
    });

   
    if (newCurrentSlide !== currentSlide) {
        currentSlide = newCurrentSlide;
       
    }
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 50);
});

document.addEventListener("DOMContentLoaded", handleScroll); 



/* ---------------------- CONTENT ANIMATION ---------------------- */

document.addEventListener("DOMContentLoaded", () => {
  updateProgressBar();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.01 });

  document.querySelectorAll('.content-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
});
