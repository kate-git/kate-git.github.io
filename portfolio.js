// --- 1. SLIDE PROGRESS BAR LOGIC ---
let currentSlide = 1;

function updateProgressBar(totalSlides) {
    const denominator = totalSlides > 1 ? (totalSlides - 1) : 1;
    const numerator = totalSlides > 1 ? (currentSlide - 1) : 0;
    
    const progress = (numerator / denominator) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}
    
function handleScroll() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let newCurrentSlide = currentSlide;
    const triggerPoint = window.scrollY + window.innerHeight * 0.5;
    
    slides.forEach((slide, index) => {
        const slideTop = slide.offsetTop;
        const slideBottom = slideTop + slide.offsetHeight;
        
        if (triggerPoint >= slideTop && triggerPoint < slideBottom) {
            newCurrentSlide = index + 1;
        }
    });

    if (newCurrentSlide !== currentSlide || !document.getElementById('progressBar').style.width) {
        currentSlide = newCurrentSlide;
        updateProgressBar(totalSlides);
    }
}
    
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 50);
});

document.addEventListener('DOMContentLoaded', () => {
    
    handleScroll(); 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.content-card').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    

    const mainSwiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    const witchSwiper = new Swiper('.witch-swiper', {
        loop: true,
        pagination: {
            el: '.witch-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.witch-next',
            prevEl: '.witch-prev',
        },
    });
});

// --- 3. MODEL-VIEWER PROGRESS BAR LOGIC ---
const onProgress = (event) => {
    const progressBar = event.target.querySelector('.model-progress-bar');
    const updatingBar = event.target.querySelector('.model-update-bar');
    
    if (!progressBar || !updatingBar) return;
    
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

    if (event.detail.totalProgress === 1) {
        progressBar.style.display = 'none';
        event.target.removeEventListener('progress', onProgress);
    } else {
        progressBar.style.display = 'block';
    }
};

document.querySelector('#island')?.addEventListener('progress', onProgress);
