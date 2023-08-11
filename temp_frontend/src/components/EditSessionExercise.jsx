import { useState } from "react"
import Button from "./Button"

const EditSessionExercise = ({ sessionId, exercise, onClear, onUpdate }) => {
    const [duration, setDuration] = useState(exercise.duration ? exercise.duration : '')
    const [notes, setNotes] = useState(exercise.notes)

    const user = JSON.parse(localStorage.getItem('user'))

    const updateExercise = async (exercise, duration, notes) => {
        const updated = { ...exercise, duration: duration, notes: notes }
        console.log(updated)
        if (user) {
            console.log('updating...')
            const response = await fetch(`/api/exercises/session/${sessionId}/${exercise.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(updated)
            })

            const data = await response.json()
            console.log(data)
            onUpdate(updated, updated.position)
            return data
        }
    }

    const onSubmit = (e) => {
        // Should update exercise in database, then take exercise out of edit mode
        e.preventDefault()

        updateExercise(exercise, duration, notes)

        onClear()
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Duration</label>
                <input
                    type="number"
                    placeholder="Exercise Duration"
                    min='0.5'
                    step='0.5'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Notes</label>
                <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            {/* <div className="form-control">
                <label></label>
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </div> */}

            <input type="submit" value='Update Exercise' className="btn btn-block" />
            <Button text='Cancel' onClick={onClear} />
        </form>
    )
}

export default EditSessionExercise
