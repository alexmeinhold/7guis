class View {
  constructor() {
    this.nameList = document.querySelector("#nameList");
    this.prefix = document.querySelector("#prefix");
    this.firstName = document.querySelector("#firstName");
    this.surname = document.querySelector("#surname");
    this.createBtn = document.querySelector("#create");
    this.updateBtn = document.querySelector("#update");
    this.deleteBtn = document.querySelector("#delete");
  }

  bindFilterChange(handler) {
    this.prefix.addEventListener("input", handler);
  }

  bindSelectionChange(handler) {
    this.nameList.addEventListener("change", handler);
  }

  bindCreateButton(handler) {
    this.createBtn.addEventListener("click", handler);
  }

  bindUpdateButton(handler) {
    this.updateBtn.addEventListener("click", handler);
  }

  bindDeleteButton(handler) {
    this.deleteBtn.addEventListener("click", handler);
  }

  renderNames(names) {
    this.nameList.innerHTML = "";
    for (const [index, name] of names.entries()) {
      const element = document.createElement("option");
      element.value = index;
      element.textContent = `${name.surname}, ${name.firstName}`;
      this.nameList.appendChild(element);
    }
  }

  getFilterPrefix() {
    return this.prefix.value;
  }

  getInputValues() {
    return {
      firstName: this.firstName.value.trim(),
      surname: this.surname.value.trim(),
    };
  }

  clearInputs() {
    this.firstName.value = "";
    this.surname.value = "";
  }

  getSelectedIndex() {
    return this.nameList.selectedIndex;
  }

  updateSelection(name) {
    this.firstName.value = name.firstName;
    this.surname.value = name.surname;
  }
}

export { View };
