import { useState, useEffect } from "react"
import Exercises from "./Exercises"
import Button from "./Button"
import Sessions from "./Sessions"
import AddExercise from "./AddExercise"

const Dashboard = () => {
    const [sessions, setSessions] = useState([])
    const [currentSession, setCurrentSession] = useState(null)

    useEffect(() => {
        const getSessions = async () => {
            const sessionsFromServer = await fetchSessions()
            console.log(sessionsFromServer)
            setSessions(sessionsFromServer)
        }

        getSessions()
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

    const user = JSON.parse(localStorage.getItem('user'))

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

    return (
        <>
            <p>{welcome}</p>
            {!currentSession && <Sessions sessions={sessions} onSelect={selectSession} onAdd={createSession} />}
            {currentSession && <><p>Session: {currentSession.name}</p><p>{currentSession.datetime}</p></>}
            {currentSession && <Button text={'Clear session'} onClick={() => setCurrentSession(null)} />}
        </>
    )
}

export default Dashboard
