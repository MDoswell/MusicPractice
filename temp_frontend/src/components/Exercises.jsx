import Exercise from "./Exercise"

const Exercises = ({ exercises }) => {
    return (
        <>
            {exercises.map((exercise) => (
                <Exercise key={exercise.id} exercise={exercise} />
            ))}
        </>
    )
}

export default Exercises
