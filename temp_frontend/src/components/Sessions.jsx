import Button from "./Button"
import AddSession from "./AddSession"

const Sessions = ({ sessions, onSelect, onAdd }) => {
    return (
        <>
            <h3>Start a session</h3>
            <h4>Recent Sessions</h4>
            {sessions.map((session) => (
                <Button key={session.id} text={session.name ? session.name : "Untitled"} onClick={() => onSelect(session)} />
            ))}
            <h4>or</h4>
            <AddSession onAdd={onAdd} />
        </>
    )
}

export default Sessions
