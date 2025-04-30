document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.hero-slider');
  const content = document.querySelector('.hero-content');
  const videos = [
    {
      src: './Assets/HOME/vid.mp4',
      poster: './Assets/HOME/1.jpg',
      animation: 'zoom',
      text: {
        h1: "Creative Spaces Construction",
        p: "Transforming Visions into Built Reality"
      },
      description: "We design and build innovative spaces that inspire creativity and productivity. From concept to completion, we bring architectural visions to life with precision and artistry."
    },
    {
      src: './Assets/HOME/vid2.mp4',
      poster: './Assets/HOME/2.jpg',
      animation: 'pan',
      text: {
        h1: "Precision Building",
        p: "Quality Construction Solutions"
      },
      description: "With 15+ years of expertise, we deliver exceptional craftsmanship through meticulous attention to detail and uncompromising quality standards in every project."
    },
    {
      src: './Assets/HOME/vid3.mp4',
      poster: './Assets/HOME/3.jpg',
      animation: 'zoom',
      text: {
        h1: "Innovative Design",
        p: "Redefining Modern Construction"
      },
      description: "We combine cutting-edge technology with sustainable practices to create functional, beautiful spaces that stand the test of time."
    }
  ];

  // Then modify your updateContent() function to include the description:
  function updateContent() {
    heroContent.classList.add('fade-out');
    setTimeout(() => {
      heroContent.querySelector('h1').textContent = videos[current].text.h1;
      heroContent.querySelector('p').textContent = videos[current].text.p;
      heroContent.querySelector('.description').textContent = videos[current].description; // Add this line
      heroContent.classList.remove('fade-out');
      heroContent.classList.add('fade-in');
      setTimeout(() => heroContent.classList.remove('fade-in'), 500);
    }, 500);
  }

  let currentIndex = 0;
  let videoElements = [];
  let interval;

  // Initialize slider
  function initSlider() {
    // Create video elements
    videos.forEach((video, index) => {
      const videoEl = document.createElement('video');
      videoEl.src = video.src;
      videoEl.poster = video.poster;
      videoEl.className = 'hero-slide-video';
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;

      if (index === 0) videoEl.classList.add('active', video.animation);

      slider.insertBefore(videoEl, content);
      videoElements.push(videoEl);
    });

    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slide-btn prev-btn';
    prevBtn.innerHTML = '&lt;';
    prevBtn.addEventListener('click', prevSlide);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slide-btn next-btn';
    nextBtn.innerHTML = '&gt;';
    nextBtn.addEventListener('click', nextSlide);

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    updateContent();
    startAutoPlay();
  }

  // Update slide content
  function updateContent() {
    content.classList.add('fade-out');

    setTimeout(() => {
      content.querySelector('h1').textContent = videos[currentIndex].text.h1;
      content.querySelector('p').textContent = videos[currentIndex].text.p;
      content.classList.remove('fade-out');
      content.classList.add('fade-in');

      setTimeout(() => {
        content.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  // Change slide
  function changeSlide(newIndex) {
    if (newIndex < 0) newIndex = videos.length - 1;
    if (newIndex >= videos.length) newIndex = 0;

    videoElements[currentIndex].classList.remove('active');
    videoElements[currentIndex].pause();

    currentIndex = newIndex;

    videoElements[currentIndex].classList.add('active');
    videoElements[currentIndex].play();
    updateContent();
  }

  function nextSlide() {
    changeSlide(currentIndex + 1);
    resetInterval();
  }

  function prevSlide() {
    changeSlide(currentIndex - 1);
    resetInterval();
  }

  // Auto-play functionality
  function startAutoPlay() {
    interval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startAutoPlay();
  }

  // Touch and keyboard controls
  slider.addEventListener('touchstart', handleTouchStart);
  slider.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('keydown', handleKeyDown);

  let touchStartX = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    clearInterval(interval);
  }

  function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();

    resetInterval();
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  }

  // Initialize the slider
  initSlider();
});