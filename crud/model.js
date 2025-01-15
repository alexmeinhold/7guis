class Model {
  constructor() {
    this.names = [
      {
        firstName: "Hans",
        surname: "Emil",
      },
      {
        firstName: "Max",
        surname: "Mustermann",
      },
      {
        firstName: "Roman",
        surname: "Tisch",
      },
    ];
  }

  getNames() {
    return this.names;
  }

  getFilteredNames(filterPrefix) {
    return this.names.filter((person) => {
      return person.surname.toLowerCase().startsWith(filterPrefix);
    });
  }

  getNameByIndex(index) {
    return this.names[index];
  }

  addName(firstName, surname) {
    if (firstName === "" || surname === "") {
      return;
    }

    console.log(`Adding person: ${firstName} ${surname}`);

    this.names.push({
      firstName: firstName,
      surname: surname,
    });
  }

  updateName(index, firstName, surname) {
    if (index < 0 || index >= this.names.length) {
      return;
    }
    if (firstName === "" || surname === "") {
      return;
    }

    let person = this.names[index];
    person.firstName = firstName;
    person.surname = surname;
  }

  deleteName(index) {
    if (index < 0 || index >= this.names.length) {
      return;
    }
    this.names.splice(index, 1);
  }
}

export { Model };
