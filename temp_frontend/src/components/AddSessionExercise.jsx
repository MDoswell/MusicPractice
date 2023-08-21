import { useState, useEffect } from "react"

const AddSessionExercise = ({ user, session, sessionExercises, onAdd }) => {
    const [exercises, setExercises] = useState([])
    const [exerciseId, setExerciseId] = useState(null)
    const [duration, setDuration] = useState('')
    const [notes, setNotes] = useState('')
    // const [description, setDescription] = useState('')

    useEffect(() => {
        // if (!user) {
        //     navigate('/login')
        // }

        // getSessionExercises()
        getExercises()
    }, [])

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

    const addSessionExercise = async (sessionId, newSessionExercise) => {
        // const newSessionExercise = {
        //     exerciseId: exerciseId,
        //     position: position,
        //     duration: duration ? duration : null,
        //     notes: notes
        // }

        console.log('new session exercises: ', newSessionExercise)

        const newSessionExercises = {
            sessionId: sessionId,
            sessionExercises: newSessionExercise
        }

        if (user && sessionId) {
            const response = await fetch(`api/exercises/session/${sessionId}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify(newSessionExercises)
            })

            const data = await response.json()
            console.log('Adding session exercise:', data)
            // return data
            // console.log("sessionExercises: ", sessionExercises)
            // console.log("newExercise: ", newSessionExercise)
            onAdd([...sessionExercises, ...newSessionExercise])
        }
    }

    const getExercise = (exerciseId) => {
        const matches = exercises.filter((exercise) => (exercise.id == exerciseId))

        return matches[0]
    }

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('submit pressed')
        console.log(exerciseId.name)
        console.log(session.id, exerciseId, sessionExercises.length, duration, notes)

        const exercise = getExercise(exerciseId)

        addSessionExercise(
            session.id, 
            [{
                session_id: session.id,
                exercise_id: exerciseId, 
                name: exercise.name,
                position: sessionExercises.length, 
                duration: duration, 
                notes: notes
            }]
        )

        setExerciseId(null)
    }

    // console.log(sessionExercises)
    // const sessionExerciseIds = sessionExercises.map(exercise => (exercise.id))
    // console.log(sessionExerciseIds)

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <label>Add exercise:</label>
            <select name="sessionExercises" value={exerciseId ? exerciseId : "placeholder"} onChange={(e) => {
                console.log(exerciseId)
                console.log(e.target)
                setExerciseId(e.target.value)
            }}>
                <option value="placeholder" disabled>Select an exercise</option>
                {exercises.map(exercise => {
                    return <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                    // if (sessionExerciseIds.includes(exercise.id)) {
                    //     return <option value={exercise.id} disabled>{exercise.name}</option>
                    // } else {
                    //     return <option value={exercise.id}>{exercise.name}</option>
                    // }
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
