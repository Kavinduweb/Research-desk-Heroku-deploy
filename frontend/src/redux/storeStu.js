import {combineReducers} from 'redux';

import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'


import { getAllUsersReducer} from './reducers/testReducer'



const finalReducer = combineReducers({
    
    getAllUsersReducer: getAllUsersReducer,
    
      

})



const composeEnhancers = composeWithDevTools({})

const storeStu = createStore(finalReducer, composeEnhancers(applyMiddleware(thunk)))

export default storeStu;