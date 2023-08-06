import Button from "./Button"
import AddSessionExercise from "./AddSessionExercise"
import SessionExercise from "./SessionExercise"

const SessionExercises = ({ exercises, onSelect, onAdd }) => {
    return (
        <>
            <h3>Start a session</h3>
            <h4>Recent Sessions</h4>
            {exercises.map((exercise) => (
                <SessionExercise key={exercise.position} exercise={exercise} />
            ))}
            <h4>or</h4>
            <AddSessionExercise onAdd={onAdd} />
        </>
    )
}

export default SessionExercises
