import { useState, useEffect } from "react"
import Button from "../components/Button"
import Sessions from "../components/Sessions"
import SessionExercises from "../components/SessionExercises"
import { useLocation, useNavigate } from "react-router-dom"

const Practice = () => {
    const { state } = useLocation()

    const session = state;

    console.log(session)

    const navigate = useNavigate()

    // const [sessions, setSessions] = useState([])
    const [exercises, setExercises] = useState([])
    // const [currentSession, setCurrentSession] = useState(null)
    const [sessionExercises, setSessionExercises] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        // getSessionExercises()
        // getExercises()
    }, [])

    // const getSessionExercises = async () => {
    //     const sessionExercisesFromServer = await fetchSessionExercises(session.id)
    //     console.log(sessionExercisesFromServer)
    //     setSessionExercises(sessionExercisesFromServer)
    // }

    // const fetchSessionExercises = async (sessionId) => {
    //     if (user && sessionId) {
    //         const response = await fetch(`/api/exercises/session/${sessionId}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `Bearer ${user.token}`
    //             }
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //         return data
    //     }
    // }

    // const updateSessionExercises = async (updatedExercise, origPosition) => {
    //     const newSessionExercises = [...sessionExercises]
    //     newSessionExercises.splice(origPosition, 1)

    //     setSessionExercises([...newSessionExercises, updatedExercise])
    // }

    // const getExercises = async () => {
    //     const exercisesFromServer = await fetchExercises()
    //     console.log(exercisesFromServer)
    //     setExercises(exercisesFromServer)
    // }

    // const fetchExercises = async () => {
    //     if (user) {
    //         const response = await fetch('/api/exercises/', {
    //             method: "GET",
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `Bearer ${user.token}`
    //             }
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //         return data
    //     }
    // }

    // const addSessionExercise = async (sessionId, exerciseId, position, duration, notes) => {
    //     const newSessionExercise = {
    //         sessionId: sessionId,
    //         exerciseId: exerciseId,
    //         position: position,
    //         completed: 0, // not completed by default
    //         duration: duration ? duration : null,
    //         notes: notes
    //     }

    //     if (user && sessionId) {
    //         const response = await fetch(`api/exercises/session/${sessionId}`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify(newSessionExercise)
    //         })

    //         const data = await response.json()
    //         console.log('Adding session exercise:', data)
    //         // return data
    //         // console.log("sessionExercises: ", sessionExercises)
    //         // console.log("newExercise: ", newSessionExercise)
    //         // setSessionExercises(...sessionExercises, newSessionExercise)
    //         getSessionExercises(session.id)
    //     }
    // }

    // const updatePositions = async (exercise, newPos) => {
    //     console.log(`moving exercise at ${exercise.position} to ${newPos}`);

    //     if (user) {
    //         console.log('moving...')
    //         const response = await fetch(`/api/exercises/session/${exercise.session_id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({sessionId: exercise.session_id, origPos: exercise.position, newPos: newPos})
    //         })

    //         const data = await response.json()
    //         console.log(data)
    //         setSessionExercises(data)
    //         return data
    //     }
    // }

    // const removeSessionExercise = async (exercise, numExercises) => {
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
    //         updatePositions(exercise, numExercises)
    //         return data
    //     }
    // }

    return (
        <>
            <p>Hi</p>
            {!session && <p>No session</p>}
            {session && <><p>Session: {session.name}</p><p>{session.datetime}</p></>}
            {/* {currentSession && <Button text={'Clear session'} onClick={() => clearSession()} />} */}
            {session && <SessionExercises
                user={user}
                session={session}
                exercises={exercises}
                sessionExercises={sessionExercises}
                // onAdd={addSessionExercise}
                // onUpdate={updateSessionExercises}
                // onUpdatePositions={updatePositions}
                // onDelete={removeSessionExercise}
            />}
        </>
    )

    // return <p>Hi</p>

}

export default Practice
