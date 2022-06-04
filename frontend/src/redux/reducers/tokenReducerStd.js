import ACTIONS from "../actions";

const tokenstd = ''



const tokenReducerSTD = (state = tokenstd, action) =>{
    switch(action.type){
        case ACTIONS.GET_TOKENSTD:
            return action.payload

        default:
            return state

    }

}

export default tokenReducerSTD