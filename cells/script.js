const table = document.querySelector("table");

const WIDTH = 4;
const HEIGHT = 6;

const cellFormulas = {};

function initializeSpreadsheet() {
  for (let i = 0; i < HEIGHT; i++) {
    const row = table.insertRow(-1);
    for (let j = 0; j < WIDTH; j++) {
      const cell = row.insertCell(-1);
      if (i === 0 && j === 0) {
        cell.textContent = "";
      } else if (i === 0) {
        cell.textContent = j;
      } else if (i >= 1 && j === 0) {
        cell.textContent = String.fromCharCode(65 + i - 1);
      } else {
        const char = String.fromCharCode(65 + i - 1);
        cell.innerHTML = `<input id=${char}${j}>`;
      }
    }
  }
}

function getCellValue(cellId) {
  const cell = document.querySelector(`input[id=${cellId}]`);
  if (cell === null) return 0;
  return parseFloat(cell.value) || 0;
}

function evaluateFormula(formula) {
  const regex = /([A-Z]\d+)/g;
  const replacedFormula = formula.replace(regex, (match) =>
    getCellValue(match)
  );
  try {
    return eval(replacedFormula);
  } catch (error) {
    return "ERR";
  }
}

function handleInput(event) {
  const cell = event.target;
  const cellId = cell.id;
  const cellValue = cell.value.trim();

  if (cellValue.startsWith("=")) {
    const formula = cellValue.slice(1);
    cellFormulas[cellId] = formula;
    cell.value = evaluateFormula(formula);
  } else {
    cellFormulas[cellId] = null;
  }

  reevaluateCells();
}

function reevaluateCells() {
  const cells = table.querySelectorAll("input");
  cells.forEach((cell) => {
    const cellId = cell.id;
    const formula = cellFormulas[cellId];
    if (formula) {
      cell.value = evaluateFormula(formula);
    }
  });
}

initializeSpreadsheet();

table.addEventListener("change", handleInput);
