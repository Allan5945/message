import initialState from './state';

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            state.role++;
            return state;
    }
};

export default reducer;
