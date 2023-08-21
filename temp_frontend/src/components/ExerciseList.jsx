import Exercise from "./Exercise"
import EditExercise from "./EditExercise"

const ExerciseList = ({ exercises, exerciseToEdit, onSelect, onUpdate, onClear, onDelete }) => {
    console.log(exercises)
    console.log(exerciseToEdit)
    return (
        <>
            {exercises
                .sort((a, b) => {
                    // alphabetical sort
                    if (a.name < b.name) {
                        return -1
                    } else if (a.name > b.name) {
                        return 1
                    } else {
                        return 0
                    }
                })
                .map((exercise) => {
                    // if exercise is selected for editing, show edit menu, otherwise show exercise
                    if (exercise.id === exerciseToEdit) {
                        console.log('match');
                        return <EditExercise key={exercise.id} exercise={exercise} onUpdate={onUpdate} onClear={onClear} />
                    } else {
                        console.log('no match');
                        return <Exercise key={exercise.id} exercise={exercise} onSelect={onSelect} onDelete={onDelete} />
                    }
                })}
        </>
    )
}

export default ExerciseList
