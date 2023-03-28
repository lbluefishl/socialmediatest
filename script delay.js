const videos = document.querySelectorAll('[id^="v"]');

// Create an IntersectionObserver for each video element
videos.forEach(video => {
  let timeoutId; // Initialize timeout ID variable

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // If the video is intersecting the viewport
      if (entry.isIntersecting) {
        // If the timeout has not been cleared, play the video after the delay
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            video.play();
          }, 2000);
        }
      } else {
        // If the video is not intersecting the viewport and is not paused
        if (!video.paused && entry.intersectionRatio < 1) {
          video.load(); // Reload the video
          video.pause(); // Pause the video
          clearTimeout(timeoutId); // Clear the timeout
          timeoutId = null; // Reset the timeout ID
        } else {
          video.pause(); // Pause the video
          clearTimeout(timeoutId); // Clear the timeout
          timeoutId = null; // Reset the timeout ID
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

setTimeout(() => {
  window.location = "survey.html";
}, 180000);
