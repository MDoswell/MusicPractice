import { useState } from "react"

const AddSessionExercise = ({ onAdd }) => {
    const [name, setName] = useState('')
    // const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd(name)

        setName('')
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <input type="submit" value='New session' className="btn" />
            <input type="text" placeholder="Session name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            {/* <div className="form-control">
                <label>Description</label>
                <input type="text" placeholder="Add Description" value={day} onChange={(e) => setDay(e.target.value)} />
            </div> */}
        </form>
    )
}

export default AddSessionExercise
