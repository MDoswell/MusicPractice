import { useState, useEffect } from "react"
import Exercises from "./Exercises"
import AddExercise from "./AddExercise"

const Dashboard = () => {
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const getGoals = async () => {
            const goalsFromServer = await fetchGoals()
            console.log(goalsFromServer)
            setGoals(goalsFromServer)
        }

        getGoals()
    }, [])

    const addGoal = async (goal) => {
        const res = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(goal)
        })

        console.log(res)

        const data = await res.json()

        console.log(data)

        setGoals([...goals, data])

        console.log(goals)
    }

    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)
    const welcome = user ? `hi ${user.name}` : 'hi nobody'

    const fetchGoals = async () => {
        if (user) {
            const response = await fetch('/api/goals', {
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

    return (
        <>
            <p>{welcome}</p>
            {/* {goals.map((goal) => (<p key={goal.ID}>{goal.goal_text}</p>))} */}
            <Exercises exercises={goals} />
            <AddExercise onAdd={addGoal} />
        </>
    )
}

export default Dashboard
