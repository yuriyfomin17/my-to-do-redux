import {v4 as uuidv4} from "uuid";

const initialState = {
    todos: [
        {
            id: uuidv4(),
            title: "first-todo",
            done: false,
            editButton: true
        },
        {
            id: uuidv4(),
            title: "second-todo",
            done: false,
            editButton: true
        }

    ]
};
const todo = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_EDIT_BUTTON':
            const indexEdit = state.todos.findIndex(el => el.id === action.payload)
            console.log(indexEdit)
            state.todos[indexEdit].editButton = !state.todos[indexEdit].editButton
            return {
                ...state,
                todos: [...state.todos]
            }
        case 'TODO_ADD':
            return {
                ...state,
                todos: [...state.todos, {id: uuidv4(), title: action.payload,editButton: true}],

            }
        case 'DELETE_TODO':
            const newArr = state.todos.filter((el) => el.id !== action.payload)
            return {
                ...state,
                todos: newArr,

            }
        case 'EDIT_TODO':
            const index = state.todos.findIndex(el => el.id === action.payload.id)
            state.todos[index].title = action.payload.editValue
            return {
                ...state,
                todos: [...state.todos],

            }
        case 'EDIT_DONE':
            const indexDoneUndone = state.todos.findIndex(el => el.id === action.payload)
            state.todos[indexDoneUndone].done = !state.todos[indexDoneUndone].done
            return {
                ...state,
                todos: [...state.todos],

            }
        case 'EDIT_POSITION':
            const indexToMove = state.todos.findIndex(el => el.id === action.payload.id)
            console.log("Index", indexToMove)
            if (action.payload.flag) {
                if (indexToMove !== 0) {

                    const [removed] = state.todos.splice(indexToMove, 1)
                    state.todos.splice(indexToMove - 1, 0, removed)
                }
            } else {
                if (indexToMove !== state.todos.length - 1) {
                    const [removed] = state.todos.splice(indexToMove, 1)
                    state.todos.splice(indexToMove + 1, 0, removed)
                }
            }
            return {
                ...state,
                todos: [...state.todos],

            }

        default:
            return state

    }

}
export default todo