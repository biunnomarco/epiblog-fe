import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
   theme: true
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state, action) {
            state.theme = !state.theme
        }
    }
})


export default themeSlice.reducer
export const  {changeTheme} = themeSlice.actions