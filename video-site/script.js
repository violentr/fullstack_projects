const videoPlayer = document.getElementById('videoPlayer');
const themeToggle = document.getElementById('themeToggle');


const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const src = thumb.getAttribute('data-src');
    videoPlayer.src = src;
    videoPlayer.load();
    videoPlayer.play();
  });
});
