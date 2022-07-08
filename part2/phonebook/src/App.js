import { useState, useEffect } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Fabian", number: 1234567890 },
    { name: "Ganesh", number: 1234567890 },
    { name: "Sammy", number: 1234567890 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));

    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h2>Add New Person</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
