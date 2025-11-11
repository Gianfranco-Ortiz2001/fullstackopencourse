const PersonForm = ({
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    handleForm
}) =>
    <form onSubmit={handleForm}>
        <div>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default PersonForm