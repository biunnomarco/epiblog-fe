import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/login`

const initialState = {
    res: {},
    loggedWithGithub: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(logIn.fulfilled, (state, action) =>{
            state.res = action.payload
        })
        .addCase(logIn.pending, (state, action) =>{
            state.res = action.payload
        })
        .addCase(logIn.rejected, (state, action) =>{
            state.res = action.payload
        })
    }
})

export const {} = loginSlice.actions;
export default loginSlice.reducer;

export const logIn = createAsyncThunk('logIn/post', async (loginFormData) => {
    const data = await fetch(endpoint, {
        method: "POST",
                body: JSON.stringify(loginFormData),
                headers: {
                    "Content-Type": "application/json"
                }
    });
    const res = await data.json()
    if (res.token) localStorage.setItem('userLoggedIn', JSON.stringify(res.token))
    
    return res
})


