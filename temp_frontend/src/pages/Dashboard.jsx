import { useState, useEffect } from "react"
import Button from "../components/Button"
import Sessions from "../components/Sessions"
import SessionExercises from "../components/SessionExercises"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))

    // if (!user) {
    //     navigate('/login')
    // }

    const [sessions, setSessions] = useState([])
    const [exercises, setExercises] = useState([])
    const [currentSession, setCurrentSession] = useState(null)
    const [sessionExercises, setSessionExercises] = useState([])

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        const getSessions = async () => {
            const sessionsFromServer = await fetchSessions()
            console.log(sessionsFromServer)
            setSessions(sessionsFromServer)
        }

        getSessions()
        getExercises()
    }, [])

    const addSession = async (session) => {
        console.log(JSON.stringify(session))
        const res = await fetch('/api/sessions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(session)
        })

        console.log(res)

        const data = await res.json()

        console.log(data)

        setSessions([...sessions, data])

        console.log(sessions)

        return data
    }

    console.log(user)
    const welcome = user ? `hi ${user.name}` : 'hi nobody'

    const fetchSessions = async () => {
        if (user) {
            const response = await fetch('/api/sessions', {
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

    const selectSession = (session) => {
        const sessionName = session.name ? session.name : 'Untitled session'
        setCurrentSession({ ...session, name: sessionName })
        getSessionExercises(session.id)
    }

    const clearSession = () => {
        setCurrentSession(null)
        setSessionExercises([])
    }

    const createSession = async (name) => {
        const newSession = {
            user_id: user.id,
            name: (name ? name : null)
        }

        const newSessionData = await addSession(newSession)

        console.log(newSessionData)

        selectSession(newSessionData)
    }

    const getSessionExercises = async (sessionId) => {
        const sessionExercisesFromServer = await fetchSessionExercises(sessionId)
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

    const getExercises = async () => {
        const exercisesFromServer = await fetchExercises()
        console.log(exercisesFromServer)
        setExercises(exercisesFromServer)
    }

    const fetchExercises = async () => {
        if (user) {
            const response = await fetch('/api/exercises/', {
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

    const addSessionExercise = async (sessionId, exerciseId, position, duration, notes) => {
        const newSessionExercise = {
            sessionId: sessionId,
            exerciseId: exerciseId,
            position: position,
            completed: 0, // not completed by default
            duration: duration ? duration : null,
            notes: notes
        }

        if (user && sessionId) {
            const response = await fetch(`api/exercises/session/${sessionId}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(newSessionExercise)
            })

            const data = await response.json()
            console.log('Adding session exercise:', data)
            // return data
            // console.log("sessionExercises: ", sessionExercises)
            // console.log("newExercise: ", newSessionExercise)
            // setSessionExercises(...sessionExercises, newSessionExercise)
            getSessionExercises(currentSession.id)
        }
    }

        return (
            <>
                <p>{welcome}</p>
                {!currentSession && <Sessions sessions={sessions} onSelect={selectSession} onAdd={createSession} />}
                {currentSession && <><p>Session: {currentSession.name}</p><p>{currentSession.datetime}</p></>}
                {currentSession && <Button text={'Clear session'} onClick={() => clearSession()} />}
                {currentSession && <SessionExercises
                    session={currentSession}
                    exercises={exercises}
                    sessionExercises={sessionExercises}
                    onAdd={addSessionExercise}
                    onUpdate={updateSessionExercises}
                />}
            </>
        )
    
}

export default Dashboard
