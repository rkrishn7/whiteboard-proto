const initialState = {
    room: {
        id: null,
        name: null,
    }
};

export default function socket(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}