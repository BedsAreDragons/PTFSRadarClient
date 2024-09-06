document.addEventListener('DOMContentLoaded', () => {
    const svgImage = document.getElementById('svg-image');
    const coordinatesBox = document.getElementById('coordinates-box');
    let scale = 1;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    // SVG dimensions
    const svgWidth = 1056;
    const svgHeight = 816;

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

    // Update coordinates box with position relative to the SVG dimensions
    function updateCoordinates(e) {
        const rect = svgImage.getBoundingClientRect();

        // Calculate mouse position relative to the SVG container
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the position within the SVG coordinate system
        const svgX = (mouseX - currentX) / scale;
        const svgY = (mouseY - currentY) / scale;

        // Ensure coordinates stay within the SVG bounds
        const x = Math.max(0, Math.min(svgWidth, svgX));
        const y = Math.max(0, Math.min(svgHeight, svgY));

        // Update the coordinates box
        coordinatesBox.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
    }
});
