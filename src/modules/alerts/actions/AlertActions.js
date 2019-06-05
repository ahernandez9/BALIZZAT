

export const showAlert = (title, description) => async (dispatch) => {
    let array = {title: title, description: description, enable: true};
    dispatch({
        type: 'FILL_ALERT',
        payload: array
    })
};

export const hideAlert = () => async (dispatch) => {
    let array = {title: "", description: "", enable: false};
    dispatch({
        type: 'FILL_ALERT',
        payload: array
    })
};
