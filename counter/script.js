const label = document.querySelector("#label");
const btn = document.querySelector("#btn");

const state = {
  count: 0,
};

function updateCounter(newCount) {
  state.count = newCount;
}

function displayCounter() {
  label.textContent = state.count;
}

function handleClick() {
  updateCounter(state.count + 1);
  displayCounter();
}

displayCounter();

btn.addEventListener("click", handleClick);
