document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.hero-slider');
  const content = document.querySelector('.hero-content');
  
  const videos = [
    {
      src: './Assets/HOME/vid3.mp4',
      animation: 'zoom',
      text: {
        h1: "Creative Spaces Construction",
        p: "Transforming Visions into Built Reality"
      },
      description: "We design and build innovative spaces that inspire creativity and productivity."
    },
    {
      src: './Assets/HOME/vid2.mp4',
      animation: 'zoom',
      text: {
        h1: "Precision Building",
        p: "Quality Construction Solutions"
      },
      description: "We deliver exceptional craftsmanship with meticulous attention to detail."
    },
  ];

  let currentIndex = 0;
  let videoElements = [];

  // Initialize slider
  function initSlider() {
    // Create video elements
    videos.forEach((video, index) => {
      const videoEl = document.createElement('video');
      videoEl.src = video.src;
      videoEl.className = 'hero-slide-video';
      videoEl.loop = false; // Disable looping
      videoEl.muted = true;
      videoEl.autoplay = index === 0; // Autoplay only first video
      videoEl.playsInline = true;

      if (index === 0) videoEl.classList.add('active', video.animation);

      slider.insertBefore(videoEl, content);
      videoElements.push(videoEl);
    });

    // Add ended event listener to first video
    videoElements[0].addEventListener('ended', nextSlide);

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
  }

  // Update slide content
  function updateContent() {
    content.classList.add('fade-out');
    setTimeout(() => {
      content.querySelector('h1').textContent = videos[currentIndex].text.h1;
      content.querySelector('p').textContent = videos[currentIndex].text.p;
     
      content.classList.remove('fade-out');
      content.classList.add('fade-in');
      setTimeout(() => content.classList.remove('fade-in'), 500);
    }, 500);
  }

  // Handle video end
  function handleVideoEnd() {
    nextSlide();
  }

  // Change slide
  function changeSlide(newIndex) {
    if (newIndex < 0) newIndex = videos.length - 1;
    if (newIndex >= videos.length) newIndex = 0;

    // Remove active class and ended listener from current video
    const currentVideo = videoElements[currentIndex];
    currentVideo.classList.remove('active');
    currentVideo.pause();
    currentVideo.removeEventListener('ended', handleVideoEnd);

    currentIndex = newIndex;

    // Add active class and start new video
    const newVideo = videoElements[currentIndex];
    newVideo.classList.add('active');
    newVideo.play();
    newVideo.addEventListener('ended', handleVideoEnd);
    
    updateContent();
  }

  function nextSlide() {
    changeSlide(currentIndex + 1);
  }

  function prevSlide() {
    changeSlide(currentIndex - 1);
  }

  // Touch and keyboard controls
  slider.addEventListener('touchstart', handleTouchStart);
  slider.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('keydown', handleKeyDown);

  let touchStartX = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  }

  // Initialize the slider
  initSlider();
});