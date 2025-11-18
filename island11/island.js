// =========================
// MODEL-VIEWER PROGRESS BAR
// =========================
const modelViewer = document.querySelector("#island");

const onProgress = (event) => {
  const progressBar = event.target.querySelector('.model-progress-bar');
  const updatingBar = event.target.querySelector('.model-update-bar');

  if (!progressBar || !updatingBar) return;

  const progress = event.detail.totalProgress * 100;
  updatingBar.style.width = progress + '%';

  // Hide progress bar when fully loaded
  if (progress === 100) {
    progressBar.style.display = 'none';
  } else {
    progressBar.style.display = 'block';
  }
};

modelViewer?.addEventListener('progress', onProgress);


// =========================
// HOTSPOTS CAMERA CONTROL
// =========================
document.querySelectorAll(".Hotspot").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.orbit) {
      modelViewer.cameraOrbit = btn.dataset.orbit;
    }
    if (btn.dataset.target) {
      modelViewer.cameraTarget = btn.dataset.target;
    }
    if (btn.dataset.fov) {
      modelViewer.fieldOfView = btn.dataset.fov;
    }
  });
});
