const Person = ({ person, deletePerson }) => (
  <p>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </p>
);

const Persons = ({ searchTerm, persons, deletePerson }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson(person)}
        />
      ))}
    </>
  );
};

export default Persons;
