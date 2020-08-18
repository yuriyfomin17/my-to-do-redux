import React, {useState} from 'react';
import {connect} from "react-redux";


function Task(props) {
    const [inputValue, setInput] = useState('')
    const index = props.todos.findIndex(el=>el.id===props.id)
    const editBut = props.todos[index].editButton
    const editTitle = () => {
        props.editTodo(props.id, inputValue)
        setInput('')
        props.editButtonToSave(props.id)
    }
    const [object] = props.todos.filter(el => el.id === props.id)
    return (
        <span>
            {object.done ? "✅" : ""}
            {props.title}
            {editBut ? <button onClick={() => props.editButtonToSave(props.id)}>Edit</button> :
                <button onClick={editTitle}>Save</button>}
            {editBut ? "" : <input value={inputValue} onChange={(e) => setInput(e.target.value)}/>}
            <button onClick={() => props.deleteTodo(props.id)}>Delete</button>
            <button onClick={() => props.editDone(props.id)}>Done</button>
            <button onClick={() => props.editPosition(props.id, true)}>↑</button>
            <button onClick={() => props.editPosition(props.id, false)}>↓</button>


        </span>
    );
}


const mapStateToProps = (state) => ({
    todos: state.todos,

});
const mapDispatchToProps = (dispatch) => ({
    deleteTodo: (id) => dispatch({type: 'DELETE_TODO', payload: id}),
    editTodo: (id, editValue) => dispatch({type: 'EDIT_TODO', payload: {id: id, editValue: editValue}}),
    editDone: (id) => dispatch({type: 'EDIT_DONE', payload: id}),
    editPosition: (id, flag) => dispatch({type: 'EDIT_POSITION', payload: {id: id, flag: flag}}),
    editButtonToSave: (id) => dispatch({type: 'CHANGE_EDIT_BUTTON', payload: id})
});
export default connect(mapStateToProps, mapDispatchToProps)(Task);
