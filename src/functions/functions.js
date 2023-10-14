export function scrollToBottom(defined) {
  const element = document.documentElement;
  const start = element.scrollTop;
  const end = defined; //  element.scrollHeight - element.clientHeight; / 105
  const duration = 1000; // Adjust the duration as needed

  const startTime = performance.now();

  function animateScroll(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    element.scrollTop = start + (end - start) * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
