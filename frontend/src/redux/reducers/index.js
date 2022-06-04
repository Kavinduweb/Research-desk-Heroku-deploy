import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import superv from './superReducer'
import tokenstd from './tokenReducerStd'




export default combineReducers({
    auth,
    token,
    users,
    tokenstd,
    superv

})