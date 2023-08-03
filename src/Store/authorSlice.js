import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSession } from "../middlewares/ProtectedRoutes";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/authors`

const initialState = {
    authors: [],
    status: 'idle',
    registerStatus: {},
    singleAuthor: {}
}



const authorSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuthors.fulfilled, (state, action) => {
                state.authors = action.payload.authors;
                state.status = 'idle'
            })
            .addCase(getAuthors.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getAuthors.rejected, (state, action) => {
                state.status = 'error'
            })
            .addCase(postAuthors.fulfilled, (state, action) => {
                state.registerStatus = action.payload
                console.log(action)
            })

            .addCase(getAuthorById.fulfilled, (state, action) => {
                state.singleAuthor = action.payload
                state.status = 'idle'
            })
    }
})

export default authorSlice.reducer;


export const getAuthors = createAsyncThunk('authors/get', async () => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const data = await fetch(endpoint, {
        headers: {
            Authorization: token
        }
    });
    const res = await data.json()
    return res;
})



export const postAuthors = createAsyncThunk('authors/post', async (postPayload) => {

    const data = new FormData()
    data.append('name', postPayload.name)
    data.append('surname', postPayload.surname)
    data.append('email', postPayload.email)
    data.append('password', postPayload.password)
    data.append('birthdate', postPayload.birthdate)
    data.append('avatar', postPayload.avatar)

    console.log(postPayload)
    console.log(data)
    const postRes = await fetch(endpoint, {
        method: "POST",
        body: data,
        /* headers: {
            "Content-Type" : "multipart/form-data"
        } */
    });
    const res = await postRes.json()
})

/* export const postAuthors = createAsyncThunk('authors/post', async(postPayload) => {

    const postRes = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(postPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await postRes.json()
}) */


export const deleteAuthor = createAsyncThunk('authors/delete', async (id) => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const delRes = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
})

export const getAuthorById = createAsyncThunk('authorById/get', async (id) => {
    const token = JSON.parse(localStorage.getItem('userLoggedIn'))
    const res = await fetch(`${endpoint}/${id}`, {
        headers: {
            Authorization: token
        }
    })
    const data = await res.json()
    return data;
})

export const changeAvatar = createAsyncThunk('avatar/patch', async (patchData) => {
    console.log(patchData)
    const form = new FormData()
    form.append('avatar', patchData.avatar)

    const res = await fetch(`${endpoint}/${patchData.id}/changeAvatar`, {
        method: 'PATCH',
        body: form,
        headers: {}
    })
    const data = await res.json()
})