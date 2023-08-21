import Button from "./Button"
import EditExercise from "./EditExercise"
import EditSessionExercise from "./EditSessionExercise"

const SessionExercise = ({ sessionId, exercise, numExercises, editMode, onSelect, onUpdate, onClear, onUpdatePositions, onDelete }) => {
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

    // const removeExercise = async (exercise) => {
    //     console.log("deleting ", exercise)

    //     if (user) {
    //         console.log('deleting...')
    //         const response = await fetch(`/api/exercises/session/${exercise.session_id}/${exercise.exercise_id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({position: exercise.position})
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //         // onUpdate(updated, updated.position)
    //         return data
    //     }
    // }

    return <div className="task">
        <p>{exercise.name}</p>
        <p>{exercise.position}</p>
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
        {
            (exercise.position > 0) &&
            <Button text={'move up'} onClick={() => onUpdatePositions(exercise, exercise.position - 1)} />
        }
        {
            (exercise.position < (numExercises - 1)) &&
            <Button text={'move down'} onClick={() => onUpdatePositions(exercise, exercise.position + 1)} />
        }
        <Button text={"Complete"} onClick={() => updateCompleted(sessionId, exercise)} />
        <Button text={"Delete"} onClick={() => onDelete(exercise, numExercises)} />
    </div>
}

export default SessionExercise
