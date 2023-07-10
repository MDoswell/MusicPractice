import { useState } from "react"

const AddExercise = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('Please add a goal')
            return
        }

        onAdd({ text: title })

        setTitle('')
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Title</label>
                <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            {/* <div className="form-control">
                <label>Description</label>
                <input type="text" placeholder="Add Description" value={day} onChange={(e) => setDay(e.target.value)} />
            </div> */}

            <input type="submit" value='Add Exercise' className="btn btn-block" />
        </form>
    )
}

export default AddExercise
