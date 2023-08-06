import { useState } from "react"
import Button from "./Button"

const EditExercise = ({ exercise, onClear, onUpdate }) => {
    const [name, setName] = useState(exercise.name)
    const [type, setType] = useState(exercise.type)
    const [description, setDescription] = useState(exercise.description)
    const [isPublic, setIsPublic] = useState(exercise.public)
    // const [description, setDescription] = useState('')

    const user = JSON.parse(localStorage.getItem('user'))

    const updateExercise = async (exercise, name, type, description, isPublic) => {
        const updated = {... exercise, name: name, type: type, description: description, public: isPublic}
        console.log(name)
        console.log(updated)
        if (user) {
            console.log('updating...')
            const response = await fetch(`/api/exercises/${exercise.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(updated)
            })

            const data = await response.json()
            console.log(data)
            onUpdate(updated)
            return data
        }
    }

    const onSubmit = (e) => {
        // Should update exercise in database, then take exercise out of edit mode
        e.preventDefault()

        if (!name) {
            alert('Exercise must have a name')
            return
        }

        updateExercise(exercise, name, type, description, isPublic)

        onClear()
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Name</label>
                <input type="text" placeholder="Exercise name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Type</label>
                <input type="text" placeholder="Exercise name" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Description</label>
                <input type="text" placeholder="Exercise name" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Public</label>
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </div>

            <input type="submit" value='Update Exercise' className="btn btn-block" />
            <Button text='Cancel' onClick={onClear} />
        </form>
    )
}

export default EditExercise
