const INITIAL_STATE = {
    title:"",
    description: "",
    enable: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FILL_ALERT':
            return action.payload;
        default:
            return state
    }
}
