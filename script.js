document.addEventListener('DOMContentLoaded', () => {
    const svgImage = document.getElementById('svg-image');
    const coordinatesBox = document.getElementById('coordinates-box');
    const crosshair = document.getElementById('crosshair');
    let scale = 1;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    // SVG dimensions
    const svgWidth = 1056;
    const svgHeight = 816;

    // Handle mouse down for dragging
    svgImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Handle mouse move for dragging
    function onMouseMove(e) {
        if (isDragging) {
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            currentX += dx;
            currentY += dy;
            svgImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            updateCoordinates(e);
            updateCrosshair();
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
        const rect = svgImage.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const newScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;

        // Calculate the new translate values to zoom towards the mouse position
        const scaleRatio = newScale / scale;
        currentX -= (mouseX * scaleRatio - mouseX) * scale;
        currentY -= (mouseY * scaleRatio - mouseY) * scale;

        scale = newScale;
        svgImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        updateCrosshair();
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

    // Update the crosshair position
    function updateCrosshair() {
        const svgRect = svgImage.getBoundingClientRect();
        crosshair.style.left = `${(svgRect.width / 2) + svgRect.left}px`;
        crosshair.style.top = `${(svgRect.height / 2) + svgRect.top}px`;
    }

    // Initial update
    updateCrosshair();
});
