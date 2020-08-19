import {uuid} from "uuidv4";

const initialState = {
    tasks: [
        {id: uuid(), name: "React", description: "Review Documentation, Practice", done: false},
        {id: uuid(), name: "Redux", description: "Review Documentation, Practice Even More!!!", done: false},
        {id: uuid(), name: "CSS", description: "Listen lectures", done: false},
        {id: uuid(), name: "Done Task", description: "Test", done: true}
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

        case 'TASK_PRIORITY_CHG':
            let i = state.tasks.findIndex(el => el.id === action.payload.id);
            const tasksPriorityChg = [...state.tasks];
            if (action.payload.direction === "up") {
                if (i !== 0) {
                    tasksPriorityChg.splice(i - 1, 0, tasksPriorityChg.splice(i, 1)[0])
                }
            }
            if (action.payload.direction === "down") {
                tasksPriorityChg.splice(i + 1, 0, tasksPriorityChg.splice(i, 1)[0])
            }

            return {
                ...state, tasks: tasksPriorityChg
            }


        default:
            return state;
    }
};

export default task;