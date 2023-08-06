import Button from "./Button"
import EditExercise from "./EditExercise"

const SessionExercise = ({ exercise, onSelect }) => {
    console.log(exercise)
    // console.log(editMode)

    const editExercise = async (exercise) => {
        console.log(exercise);
    }

    return <>
        {/* {editMode && <EditExercise exercise={exercise} />} */}
        <p>{exercise.name}</p>
        {/* {editMode && <p>editing...</p>} */}
        <p>{exercise.author}</p>
        <Button text='Edit' onClick={() => onSelect(exercise)} />
    </>
}

export default SessionExercise
