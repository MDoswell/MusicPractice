const Exercise = ({ exercise }) => {
    console.log(exercise)

    const exerciseName = exercise.name ? exercise.name : exercise.datetime

    return <p>{exerciseName}</p>
}

export default Exercise
