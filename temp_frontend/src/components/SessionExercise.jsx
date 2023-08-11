import Button from "./Button"
import EditExercise from "./EditExercise"
import EditSessionExercise from "./EditSessionExercise"

const SessionExercise = ({ sessionId, exercise, editMode, onSelect, onUpdate, onClear }) => {
    console.log(editMode)
    // console.log(editMode)

    const user = JSON.parse(localStorage.getItem('user'))

    const updateCompleted = async (sessionId, exercise) => {
        const updated = { ...exercise, completed: exercise.completed ? 0 : 1 }
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

    return <div className="task">
        {/* {editMode && <EditExercise exercise={exercise} />} */}
        <p>{exercise.name}</p>
        {/* {editMode && <p>editing...</p>} */}
        <p>{exercise.author}</p>
        {exercise.completed === 1 && <p>Complete</p>}
        {
            editMode &&
            <EditSessionExercise
                sessionId={sessionId}
                exercise={exercise}
                onClear={onClear}
                onUpdate={onUpdate}
            />
        }
        {
            !editMode &&
            <Button text={'Edit'} onClick={onSelect} />
        }
        <Button text={"Complete"} onClick={() => updateCompleted(sessionId, exercise)} />
    </div>
}

export default SessionExercise
