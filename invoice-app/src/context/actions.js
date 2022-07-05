import { nanoid } from "nanoid";

const ROOT_URL = process.env.REACT_APP_SERVER_URL;

export async function loginUser(dispatch, loginPayload) {

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/users?email=${loginPayload.email}&password=${loginPayload.password}`);
        let data = await response.json();

        if (data[0]) {
            const auth_token = nanoid(10)
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data[0], auth_token: auth_token } });
            dispatch({ type: 'LOGIN_ERROR', error: null });
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            localStorage.setItem('userToken', JSON.stringify(auth_token));
            return data[0]
        }

        dispatch({ type: 'LOGIN_ERROR', error: "User not found" });
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
}