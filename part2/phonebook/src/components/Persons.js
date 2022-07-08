const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ searchTerm, persons }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

export default Persons;
