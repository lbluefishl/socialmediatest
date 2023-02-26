 const videos = document.querySelectorAll('[id^="v"]');

// Create an IntersectionObserver for each video element
videos.forEach(video => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // If the video is intersecting the viewport
      if (entry.isIntersecting) {
        video.play(); // Play the video
      } else {
        // If the video is not intersecting the viewport and is not paused
        if (!video.paused && entry.intersectionRatio === 0) {
          video.load(); // Reload the video
          video.pause(); // Pause the video
        } else {
          video.pause(); // Pause the video
        }
      }
    });
  }, { threshold: 0 });

  observer.observe(video);

  // Get the video container element for this video
  const videoContainer = document.querySelector(`.video-container[data-video="${video.id}"]`);
  if (videoContainer) {
    // Set the height of the video container to match the video height
    videoContainer.style.height = video.videoHeight + 'px';
  }
});

