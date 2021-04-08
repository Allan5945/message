import { createStore } from 'redux';
import reducer from './mutations';
import initialState from './state';
let store = createStore(reducer, initialState);


export default store;
