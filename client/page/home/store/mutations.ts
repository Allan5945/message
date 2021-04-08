import initialState from './state';
import * as types from './types';

const reducer = (state = initialState, action: any) => {
    const type = action.type;
    const newState = action.state;
    switch (type) {
        case types.USERDATA:
            return {...state, ...{user: newState}};
        case types.SETCHAT:
            return {...state, ...{setChat: newState}};
        default:
            return state;
    }
};

export default reducer;
