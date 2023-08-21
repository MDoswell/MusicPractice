import { useEffect, useState } from "react"
import Button from "./Button"

const SessionPlayer = ({ exerciseToPlay, onPlay, onExerciseComplete }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [exerciseStarted, setExerciseStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(null)

    // if (exercisePlaying) {
    //     console.log(exercisePlaying)
    // }

    useEffect(() => {
        if (exerciseToPlay) {
            if (!exerciseStarted) {
                console.log('setting duration', exerciseToPlay)
                setTimeLeft(exerciseToPlay.duration)
                setExerciseStarted(true)
            }

            if (isPlaying) {
                const timer = setTimeout(() => {
                    setTimeLeft(calculateTimeLeft());
                }, 1000);

                return () => clearTimeout(timer);
            }
        }
    })

    const calculateTimeLeft = () => {
        if (timeLeft > 0) {
            return timeLeft - 1
        } else {
            onExerciseComplete()
            setExerciseStarted(false)
            return
        }
    }

    const startPlaying = () => {
        console.log('run start playing')
        console.log(exerciseToPlay)
        onPlay()
        setIsPlaying(!isPlaying)
    }

    return (
        <div>
            <p>Session player here</p>
            <Button text={'Play'} onClick={() => startPlaying()} />
            <p>{timeLeft}</p>
        </div>
    )
}

export default SessionPlayer
