import { useState } from "react"

const AddExercise = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Exercise needs a name')
            return
        }

        onAdd({
            name: name,
            type: type,
            description: description,
            isPublic: isPublic
        })
        //userId, username, exerciseName, type, description, public
        //name, type, description, author, public, user_id
        //req.user.id, req.user.name, req.body.name, req.body.type, req.body.description, req.body.isPublic

        setName('')
    }

    return (
        <div className="container">
            <h3>Add Exercise</h3>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Name</label>
                    <input type="text" placeholder="Add Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Type</label>
                    <input type="text" placeholder="Add Type" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Description</label>
                    <input type="text" placeholder="Add Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Public?</label>
                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                </div>

                <input type="submit" value='Add Exercise' className="btn btn-block" />
            </form>
        </div>
    )
}

export default AddExercise
