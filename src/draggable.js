export function makeDraggableByClass() {
  const elements = document.querySelectorAll(".draggable");

  elements.forEach((element) => {
    let offsetX, offsetY;

    element.addEventListener("mousedown", (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Calculate the initial offset
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;

      // Mouse move listener to track the dragging
      function onMouseMove(e) {
        // Calculate the new position
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Update the position of the element
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
      }

      // Mouse up listener to stop dragging
      function onMouseUp() {
        // Remove the event listeners when mouse is released
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      // Attach mouse move and mouse up event listeners
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });
}

// Initialize the draggable functionality on all elements with the 'draggable' class
makeDraggableByClass();
