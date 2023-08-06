import { useState, useEffect } from "react"
// import Exercises from "../components/ExerciseList"
import Button from "../components/Button"
import Sessions from "../components/Sessions"
import AddExercise from "../components/AddExercise"
import ExerciseList from "../components/ExerciseList"

const Exercises = () => {
    const [exerciseList, setExerciseList] = useState([])
    const [exerciseToEdit, setExerciseToEdit] = useState(null)
    // const [currentSession, setCurrentSession] = useState(null)

    useEffect(() => {
        const getExercises = async () => {
            const exercisesFromServer = await fetchExercises()
            console.log(exercisesFromServer)
            setExerciseList(exercisesFromServer)
        }

        getExercises()
    }, [])

    const addExercise = async (exercise) => {
        console.log(JSON.stringify(exercise))
        const res = await fetch('/api/exercises', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(exercise)
        })

        console.log(res)

        const data = await res.json()

        console.log(data)

        setExerciseList([...exerciseList, data])

        console.log(exerciseList)

        return data
    }

    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)
    const welcome = user ? `hi ${user.name}` : 'hi nobody'

    const fetchExercises = async () => {
        if (user) {
            const response = await fetch('/api/exercises', {
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

    const editExercise = (exercise) => {
        exercise.id ? setExerciseToEdit(exercise.id) : setExerciseToEdit(null)
    }

    const updateExerciseList = (updatedExercise) => {
        const updatedExercises = exerciseList.map((exercise) => {
            if (exercise.id === updatedExercise.id) {
                return updatedExercise
            } else {
                return exercise
            }
        })

        setExerciseList(updatedExercises)
    }

    // const selectSession = (session) => {
    //     const sessionName = session.name ? session.name : 'Untitled session'
    //     setCurrentSession({ ...session, name: sessionName })
    // }

    // const createSession = async (name) => {
    //     const newSession = {
    //         user_id: user.id,
    //         name: (name ? name : null)
    //     }

    //     const newSessionData = await addSession(newSession)

    //     console.log(newSessionData)

    //     selectSession(newSessionData)
    // }

    return (
        <>
            {/* <p>{welcome}</p>
            {!currentSession && <Sessions sessions={sessions} onSelect={selectSession} onAdd={createSession} />}
            {currentSession && <><p>Session: {currentSession.name}</p><p>{currentSession.datetime}</p></>}
            {currentSession && <Button text={'Clear session'} onClick={() => setCurrentSession(null)} />} */}
            <p>Exercises</p>
            <ExerciseList
                exercises={exerciseList}
                exerciseToEdit={exerciseToEdit}
                onSelect={editExercise}
                onUpdate={updateExerciseList}
                onClear={() => setExerciseToEdit(null)}
            />
        </>
    )
}

export default Exercises
