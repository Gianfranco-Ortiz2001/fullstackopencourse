import Person from "./Person"
const Persons = ({ personsToShow, removePerson }) =>
    <div>{personsToShow.map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}</div>

export default Persons