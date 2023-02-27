
const iframes = document.querySelectorAll('.embed-video');



// Create an IntersectionObserver for each iframe element
iframes.forEach(iframe => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // If the iframe is intersecting the viewport
      if (entry.isIntersecting) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); // Play the video
      } else {
        // If the iframe is not intersecting the viewport and is not paused
        if (iframe.contentWindow && iframe.contentWindow.postMessage && !iframe.paused && entry.intersectionRatio < 1) {
          iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*'); // Seek to the beginning of the video
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); // Pause the video
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); // Pause the video
          iframe.contentWindow.location.reload(); // Reload the video
        }
      }
    });
  }, { threshold: 0 });

  observer.observe(iframe);
});
