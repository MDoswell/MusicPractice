import Exercise from "./Exercise"
import EditExercise from "./EditExercise"

const ExerciseList = ({ exercises, exerciseToEdit, onSelect, onUpdate, onClear }) => {
    console.log(exercises)
    console.log(exerciseToEdit)
    return (
        <>
            {exercises.map((exercise) => {
                if (exercise.id === exerciseToEdit) {
                    console.log('match');
                    return <EditExercise key={exercise.id} exercise={exercise} onUpdate={onUpdate} onClear={onClear} />
                } else {
                    console.log('no match');
                    return <Exercise key={exercise.id} exercise={exercise} onSelect={onSelect} />
                }
            })}
        </>
    )
}

export default ExerciseList
