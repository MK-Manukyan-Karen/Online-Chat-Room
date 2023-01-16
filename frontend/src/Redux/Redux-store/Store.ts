import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { chatReducer } from '../Reducers/Chat-reducer';
import thunk from 'redux-thunk';


let rootReducer = combineReducers({
    chat : chatReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [key : string] : (...arg:any[]) => infer U } ? U : never 

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//@ts-ignore
window.store = store;

export default store;