import Button from "./Button"
import AddSessionExercise from "./AddSessionExercise"
import SessionExercise from "./SessionExercise"
import { useState, useEffect } from "react"

const SessionExercises = ({ user, session, exercises, onAdd, onUpdate, onUpdatePositions, onDelete }) => {
    const [sessionExercises, setSessionExercises] = useState([])
    // const [exercises, setExercises] = useState([])
    const [exerciseToEdit, setExerciseToEdit] = useState(null)

    useEffect(() => {
        // if (!user) {
        //     navigate('/login')
        // }

        getSessionExercises()
        // getExercises()
    }, [])

    const getSessionExercises = async () => {
        const sessionExercisesFromServer = await fetchSessionExercises(session.id)
        console.log(sessionExercisesFromServer)
        setSessionExercises(sessionExercisesFromServer)
    }

    const fetchSessionExercises = async (sessionId) => {
        if (user && sessionId) {
            const response = await fetch(`/api/exercises/session/${sessionId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })

            const data = await response.json()
            console.log(data)
            return data
        }
    }

    const updateSessionExercises = async (updatedExercise, origPosition) => {
        const newSessionExercises = [...sessionExercises]
        newSessionExercises.splice(origPosition, 1)

        setSessionExercises([...newSessionExercises, updatedExercise])
    } 

    const updatePositions = async (exercise, newPos) => {
        console.log(`moving exercise at ${exercise.position} to ${newPos}`);

        if (user) {
            console.log('moving...')
            const response = await fetch(`/api/exercises/session/${exercise.session_id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({sessionId: exercise.session_id, origPos: exercise.position, newPos: newPos})
            })

            const data = await response.json()
            console.log(data)
            setSessionExercises(data)
            return data
        }
    }

    const removeSessionExercise = async (exercise, numExercises) => {
        console.log("deleting ", exercise)

        if (user) {
            console.log('deleting...')
            const response = await fetch(`/api/exercises/session/${exercise.session_id}/${exercise.exercise_id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({position: exercise.position})
            })

            const data = await response.json()
            console.log(data)
            updatePositions(exercise, numExercises)
            return data
        }
    }

    console.log(sessionExercises)

    return (
        <>
            {/* <h3>{session.name}</h3> */}
            <h4>Exercises</h4>
            {sessionExercises.sort((a, b) => (a.position - b.position)).map((exercise) => (
                <SessionExercise
                    key={exercise.position}
                    sessionId={session.id}
                    exercise={exercise}
                    numExercises={sessionExercises.length}
                    editMode={exercise === exerciseToEdit}
                    onSelect={() => setExerciseToEdit(exercise)}
                    onUpdate={updateSessionExercises}
                    onClear={() => setExerciseToEdit(null)}
                    onUpdatePositions={updatePositions}
                    onDelete={removeSessionExercise}
                />
            ))}
            {sessionExercises.length === 0 && <p>This session has no exercises. Add some!</p>}
            {/* <AddSessionExercise user={user} session={session} sessionExercises={sessionExercises} onAdd={setSessionExercises} /> */}
        </>
    )
}

export default SessionExercises
