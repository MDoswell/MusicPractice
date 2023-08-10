import Button from "./Button"
import AddSessionExercise from "./AddSessionExercise"
import SessionExercise from "./SessionExercise"
import { useEffect } from "react"

const SessionExercises = ({ session, exercises, sessionExercises, onSelect, onAdd }) => {
    return (
        <>
            {/* <h3>{session.name}</h3> */}
            <h4>Exercises</h4>
            {sessionExercises.sort((a, b) => (a.position - b.position)).map((exercise) => (
                <SessionExercise key={exercise.position} exercise={exercise} />
            ))}
            {sessionExercises.length === 0 && <p>This session has no exercises. Add some!</p>}
            <AddSessionExercise session={session} exercises={exercises} sessionExercises={sessionExercises} onAdd={onAdd} />
        </>
    )
}

export default SessionExercises
