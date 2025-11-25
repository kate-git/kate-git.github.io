// --- MODEL-VIEWER HOTSPOT LOGIC  ---
const viewer = document.querySelector("#island");

if (viewer) {
    viewer.querySelectorAll('.Hotspot').forEach((hotspot) => {
        hotspot.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const orbit = hotspot.dataset.orbit;
            const target = hotspot.dataset.target;
            const fov = hotspot.dataset.fov;

            if (orbit) viewer.cameraOrbit = orbit;
            if (target) viewer.cameraTarget = target;
            if (fov) viewer.fieldOfView = fov;

            const annotation = hotspot.querySelector('.HotspotAnnotation');
            if (annotation) {
                annotation.classList.toggle('visible-annotation'); 
            }
        });
    });
}
