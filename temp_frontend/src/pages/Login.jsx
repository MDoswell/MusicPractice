import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"

const Login = ({ user }) => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [showError, setShowError] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const { email, password } = formData

    const onSubmit = async (e) => {
        console.log('ran')
        e.preventDefault()

        const userData = {
            email,
            password
        }

        // dispatch(login(userData));
        console.log(JSON.stringify(userData))

        const response = await fetch('/api/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const resData = await response.json()

        if (response.status == 200) {
            console.log('Valid credentials: logging in.')
            localStorage.setItem('user', JSON.stringify(resData))
            navigate('/')
        } else {
            console.log(resData.message)
            setErrorMessage(resData.message)
            setShowError(true)
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    Login
                </h1>
                <p>Please login</p>
            </section>

            {showError && <ErrorMessage message={errorMessage} />}

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login