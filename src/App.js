import React, {useState} from 'react';
import Task from "./Task"
import './App.css';
import {connect} from 'react-redux';


function App(props) {
    const [inputValue, setInput] = useState('')
    const addTodo = () => {
        props.addTodo(inputValue)
        setInput('')
    }
    return (
        <div className="App">
            <input value={inputValue} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={addTodo}>Create todo</button>

            {props.todos.map((el, index) =>
                <li key={index}>
                    <Task key={el.id} title={el.title} id={el.id}/>
                </li>
            )}

        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos
});
const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch({type: 'TODO_ADD', payload: todo})

});
export default connect(mapStateToProps, mapDispatchToProps)(App);
