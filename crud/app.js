import { Model } from "./model.js";
import { View } from "./view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindFilterChange(this.handleFilterChange.bind(this));
    this.view.bindSelectionChange(this.handleSelectionChange.bind(this));
    this.view.bindCreateButton(this.handleCreate.bind(this));
    this.view.bindUpdateButton(this.handleUpdate.bind(this));
    this.view.bindDeleteButton(this.handleDelete.bind(this));
  }

  initialize() {
    this.view.renderNames(this.model.getNames());
  }

  handleFilterChange() {
    const filteredNames = this.model.getFilteredNames(
      this.view.getFilterPrefix()
    );
    this.view.renderNames(filteredNames);
  }

  handleSelectionChange() {
    const selectedIndex = this.view.getSelectedIndex();
    const selectedName = this.model.getNameByIndex(selectedIndex);
    this.view.updateSelection(selectedName);
  }

  handleCreate() {
    const { firstName, surname } = this.view.getInputValues();
    if (firstName && surname) {
      this.model.addName(firstName, surname);
      this.view.renderNames(this.model.getNames());
      this.view.clearInputs();
    }
  }

  handleUpdate() {
    const { firstName, surname } = this.view.getInputValues();
    const selectedIndex = this.view.getSelectedIndex();

    if (selectedIndex !== -1 && firstName && surname) {
      this.model.updateName(selectedIndex, firstName, surname);
      this.view.renderNames(this.model.getNames());
      this.view.clearInputs();
    }
  }

  handleDelete() {
    const selectedIndex = this.view.getSelectedIndex();
    if (selectedIndex !== -1) {
      this.model.deleteName(selectedIndex);
      this.view.renderNames(this.model.getNames());
      this.view.clearInputs();
    }
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
controller.initialize();
