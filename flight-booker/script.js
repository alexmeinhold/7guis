const flightType = document.querySelector("#combo");
const startDate = document.querySelector("#startDate");
const returnDate = document.querySelector("#returnDate");
const bookBtn = document.querySelector("#book");

function updateFlightType() {
  if (flightType.value === "return") {
    returnDate.disabled = false;
  } else {
    returnDate.disabled = true;
  }

  updateBookButton();
}

function updateBookButton() {
  const startFlight = new Date(startDate.value);
  const returnFlight = new Date(returnDate.value);

  if (flightType.value === "return" && returnFlight < startFlight) {
    bookBtn.disabled = true;
  } else {
    bookBtn.disabled = false;
  }
}

function bookFlight() {
  let message = `You have booked a `;
  if (flightType.value === "one-way") {
    message += `flight on ${startDate.value}`;
  } else {
    message += `on ${startDate.value} returning ${returnDate.value}`;
  }
  alert(message);
}

flightType.addEventListener("change", updateFlightType);
startDate.addEventListener("change", updateBookButton);
returnDate.addEventListener("change", updateBookButton);
bookBtn.addEventListener("click", bookFlight);
