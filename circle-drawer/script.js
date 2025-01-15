const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const popup = document.querySelector("#popup");
const coordinates = document.querySelector("#coordinates");
const slider = document.querySelector("#slider");
const undo = document.querySelector("#undo");
const redo = document.querySelector("#redo");

const DEFAULT_RADIUS = 20;
let circles = [];
let selectedCircle = null;
let undoStack = [];
let redoStack = [];

function createCircle(x, y, radius) {
  const circle = { x, y, radius };
  circles.push(circle);
  addToUndoStack({ action: "create", circle });
  return circle;
}

function drawCircle(circle, selected) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  if (selected) {
    ctx.fillStyle = "grey";
    ctx.fill();
  }
  ctx.stroke();
}

function renderCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    const selected = circle === selectedCircle;
    drawCircle(circle, selected);
  });
}

function isIntersect(point, circle) {
  return (
    Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) <
    circle.radius
  );
}

function findSelectedCircle(point) {
  for (const circle of circles) {
    if (isIntersect(point, circle)) {
      return circle;
    }
  }
  return null;
}

function showModal() {
  coordinates.textContent = `(${selectedCircle.x}, ${selectedCircle.y})`;
  slider.value = 2 * selectedCircle.radius;
  popup.showModal();
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const point = { x, y };
  const circleTarget = findSelectedCircle(point);

  if (circleTarget) {
    selectedCircle = circleTarget;
    showModal();
  } else {
    createCircle(x, y, DEFAULT_RADIUS);
  }
  renderCircles();
}

function handleSlider() {
  if (!selectedCircle) return;

  const newRadius = Number(slider.value) / 2;

  if (selectedCircle.radius !== newRadius) {
    addToUndoStack({
      action: "resize",
      circle: selectedCircle,
      newRadius: newRadius,
      oldRadius: selectedCircle.radius,
    });
    selectedCircle.radius = newRadius;
    renderCircles();
  }
}

function addToUndoStack(action) {
  undoStack.push(action);
  redoStack = [];
}

function handleUndo() {
  if (undoStack.length === 0) return;

  let lastChange = undoStack.pop();
  redoStack.push(lastChange);

  if (lastChange.action === "create") {
    circles = circles.filter((circle) => circle !== lastChange.circle);
  } else if (lastChange.action === "resize") {
    lastChange.circle.radius = lastChange.oldRadius;
  }

  renderCircles();
}

function handleRedo() {
  if (redoStack.length === 0) return;

  let lastChange = redoStack.pop();
  undoStack.push(lastChange);

  if (lastChange.action === "create") {
    circles.push(lastChange.circle);
  } else if (lastChange.action === "resize") {
    lastChange.circle.radius = lastChange.newRadius;
  }

  renderCircles();
}

canvas.addEventListener("click", handleClick);
slider.addEventListener("input", handleSlider);
undo.addEventListener("click", handleUndo);
redo.addEventListener("click", handleRedo);
