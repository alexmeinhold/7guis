const celsiusInput = document.querySelector("#celsius");
const fahrenheitInput = document.querySelector("#fahrenheit");

function celsiusToFahrenheit(celsius) {
  const fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit.toFixed(2);
}

function fahrenheitToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius.toFixed(2);
}

function updateFahrenheit() {
  const celsius = Number(celsiusInput.value);
  if (isNaN(celsius)) {
    console.log("Invalid value");
    return;
  }
  fahrenheitInput.value = celsiusToFahrenheit(celsius);
}

function updateCelsius() {
  const fahrenheit = Number(fahrenheitInput.value);
  if (isNaN(fahrenheit)) {
    console.log("Invalid value");
    return;
  }
  celsiusInput.value = fahrenheitToCelsius(fahrenheit);
}

celsiusInput.addEventListener("input", updateFahrenheit);
fahrenheitInput.addEventListener("input", updateCelsius);
