import { useState, useEffect } from "react"
import Button from "../components/Button"
import Sessions from "../components/Sessions"
import SessionExercises from "../components/SessionExercises"
import { useLocation, useNavigate } from "react-router-dom"
import SessionPlayer from "../components/SessionPlayer"

const Practice = () => {
    const { state } = useLocation()

    const session = state;

    console.log(session)

    const navigate = useNavigate()

    // const [sessions, setSessions] = useState([])
    const [exercises, setExercises] = useState([])
    const [sessionExercises, setSessionExercises] = useState([])
    const [exercisePlaying, setExercisePlaying] = useState(null)

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        // if (sessionExercises) {
        //     setExercisePlaying(sessionExercises[0])
        //     console.log('set ex playing to ', exercisePlaying)
        // }

        // getSessionExercises()
        // getExercises()
    }, [])

    const updateSessionExerciseList = async (exercises, playingPos) => {
        setSessionExercises(exercises)
        console.log('updating playing pos...', playingPos)
        setExercisePlaying(playingPos)
    }

    const playNextExercise = async () => {
        // const nextExercise = (exercisePlaying.position + 1) < sessionExercises.length ? sessionExercises[exercisePlaying] : null
        console.log('play next...')
        const nextPos = exercisePlaying + 1
        if (nextPos < sessionExercises.length) {
            setExercisePlaying(nextPos)
        } else {
            setExercisePlaying(null)
        }
        // setExercisePlaying(nextExercise)
    }

    const playExercises = async (start) => {
        const startPos = start ? start : 0
        setExercisePlaying(startPos)
        console.log('exercise playing: ', exercisePlaying)
    }

    // setExercisePlaying({duration: 5})
    const getExerciseToPlay = () => {
        const arr = sessionExercises.filter(exercise => exercise.position == exercisePlaying)
        return arr[0]
    }

    return (
        <>
            <p>Hi</p>
            {!session && <p>No session</p>}
            {session && <><p>Session: {session.name}</p><p>{session.datetime}</p></>}
            <SessionPlayer
                exerciseToPlay={getExerciseToPlay()}
                onPlay={playExercises}
                onExerciseComplete={playNextExercise}
            />
            {session && <SessionExercises
                user={user}
                session={session}
                sessionExercises={sessionExercises}
                onUpdateList={updateSessionExerciseList}
                exercisePlaying={exercisePlaying}
                onUpdatePlaying={setExercisePlaying}
            />}
        </>
    )

    // return <p>Hi</p>

}

export default Practice
