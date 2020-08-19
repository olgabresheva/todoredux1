import {uuid} from "uuidv4";

const initialState = {
    tasks: [
        {id: uuid(), name: "Task -1", description: "Description -1", done: true},
        {id: uuid(), name: "Task -2", description: "Description -2", done: false},
        {id: uuid(), name: "Task -3", description: "Description -3", done: true},
    ],
};

const task = (state = initialState, action) => {
    switch (action.type) {

        case 'TASK_ADD':
            return {
                ...state,
                tasks: [...state.tasks,
                    {id: uuid(), name: action.payload.name, description: action.payload.description, done: false}]
            };

        case 'TASK_DELETE':
            const tasksDelete = state.tasks.filter(el => el.id !== action.payload)

            return {
                ...state,
                tasks: tasksDelete
            };

        case 'TASK_STATE_CHG':
            const tasksStateChg = state.tasks.map(el => {
                if (el.id === action.payload) return ({...el, done: !el.done})
                else return el;
            })

            return {
                ...state,
                tasks: tasksStateChg
            }

        case 'TASK_EDIT':
            const tasksEdit = state.tasks.map(el => {
                if (el.id === action.payload.id) return ({
                    ...el,
                    name: action.payload.newName,
                    description: action.payload.newDesc
                })
                else return el;
            })
            return {
                ...state,
                tasks: tasksEdit
            }

        default:
            return state;
    }
};

export default task;