import { useState, useEffect } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";
import personService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`Update ${newName}'s phone number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage("Person updated.");
            setMessageType("success");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch(() => {
            console.log("Failed to update person.");
            setMessage("Failed to update person.");
            setMessageType("error");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        setMessage("Person added.");
        setMessageType("success");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch(() => {
        console.log("Failed to create person.");
        setMessage("Failed to create person.");
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  const deletePerson = (person) => {
    const personId = person.id;

    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
          .remove(person.id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== person.id));
            setMessage("Person deleted.");
            setMessageType("success");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch(() => {
            console.log("Failed to delete person.");
            setMessage("Failed to delete person.");
            setMessageType("error");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
      }
    };
  };

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch(() => {
        console.log("Failed to get persons.");
        setMessage("Failed to get persons.");
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
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
      <Message message={message} type={messageType} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
