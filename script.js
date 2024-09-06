// JavaScript for zooming, panning, and coordinates
document.addEventListener('DOMContentLoaded', () => {
    const svgImage = document.getElementById('svg-image');
    const coordinatesBox = document.getElementById('coordinates-box');
    let scale = 1;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    // Handle mouse down for dragging
    svgImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Handle mouse move for dragging
    function onMouseMove(e) {
        if (isDragging) {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            svgImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
            updateCoordinates(e);
        }
    }

    // Handle mouse up for dragging
    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Handle zooming with mouse wheel
    svgImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        scale *= e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
        svgImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    });

    // Update coordinates box
    function updateCoordinates(e) {
        const rect = svgImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        coordinatesBox.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    }
});
