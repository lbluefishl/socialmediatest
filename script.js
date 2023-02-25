const video = document.getElementById("video");

const observer = new IntersectionObserver(
  (entries) => {
    // If the video is in the viewport
    if (entries[0].isIntersecting) {
      video.play(); // Start playing the video
    } else {
      video.pause(); // Pause the video
    }
  },
  {
    threshold: 0.5, // The video will start playing when it is 50% in the viewport
  }
);

observer.observe(video);