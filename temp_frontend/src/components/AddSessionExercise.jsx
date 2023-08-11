import { useState } from "react"

const AddSessionExercise = ({ session, exercises, sessionExercises, onAdd }) => {
    const [exerciseId, setExerciseId] = useState(null)
    const [duration, setDuration] = useState('')
    const [notes, setNotes] = useState('')
    // const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('submit pressed')
        console.log(session.id, exerciseId, sessionExercises.length, duration, notes)
        onAdd(session.id, exerciseId, sessionExercises.length, duration, notes)

        setExerciseId(null)
    }

    console.log(sessionExercises)
    const sessionExerciseIds = sessionExercises.map(exercise => (exercise.id))
    console.log(sessionExerciseIds)

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <label>Add exercise:</label>
            <select name="sessionExercises" onChange={(e) => {
                console.log(exerciseId)
                setExerciseId(e.target.value)
            }}>
                <option value="" disabled selected={!exerciseId}>Select an exercise</option>
                {exercises.map(exercise => {
                    if (sessionExerciseIds.includes(exercise.id)) {
                        return <option value={exercise.id} disabled>{exercise.name}</option>
                    } else {
                        return <option value={exercise.id}>{exercise.name}</option>
                    }
                })}
            </select>
            {
                exerciseId &&
                <>
                    <div className="form-control">
                        <label>Duration (optional)</label>
                        <input
                            type="number"
                            placeholder="Add Duration"
                            min='0.5'
                            step='0.5'
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label>Notes (optional)</label>
                        <textarea placeholder="Add Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <input type="submit" value='Add' className="btn" />
                </>
            }
            {/* <input type="text" placeholder="Session name (optional)" value={name} onChange={(e) => setName(e.target.value)} /> */}
            {/* <div className="form-control">
                <label>Description</label>
                <input type="text" placeholder="Add Description" value={day} onChange={(e) => setDay(e.target.value)} />
            </div> */}
        </form>
    )
}

export default AddSessionExercise
