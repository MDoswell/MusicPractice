import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    const navigate = useNavigate()

    const logout = () => {
        console.log('ran logout')
        localStorage.removeItem('user')
        // setUser(null)
        navigate(0)
    }


    return (
        <>
            <header className='header'>
                <h1>{title}</h1>
                <Button
                    color={showAdd ? 'grey' : 'green'}
                    text={'Logout'}
                    onClick={logout}
                />
            </header>
            <a href='/'>Dashboard  </a>
            <a href='/exercises'>Exercises</a>
        </>
    )
}

Header.defaultProps = {
    title: 'Music Practice thing'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
