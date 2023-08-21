import Button from "./Button"
import EditExercise from "./EditExercise"

const Exercise = ({ exercise, onSelect, onDelete }) => {
    console.log(exercise)
    // console.log(editMode)

    const editExercise = async (exercise) => {
        console.log(exercise);
    }

    return <div className="task">
        {/* {editMode && <EditExercise exercise={exercise} />} */}
        <p>{exercise.name}</p>
        {/* {editMode && <p>editing...</p>} */}
        <p>{exercise.author}</p>
        <Button text='Edit' onClick={() => onSelect(exercise)} />
        <Button text='Delete' onClick={() => onDelete(exercise)} />
    </div>
}

export default Exercise
