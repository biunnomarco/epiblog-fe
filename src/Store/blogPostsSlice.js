import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/`
const endpointInternal = `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/internalUpload`

const initialState = {
    posts: [],
    status: 'idle',
    singlePost: {},
    searchStatus: 'idle'
}

const blogPostsSlice = createSlice({
    name: 'blogPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogPosts.fulfilled, (state, action) => {
                state.posts = action.payload.blogPosts
                state.status = 'idle'
                state.searchStatus = 'idle'
            })
            .addCase(getBlogPosts.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getBlogPosts.rejected, (state, action) => {
                state.status = 'error'
            })


            .addCase(postBlogPosts.fulfilled, (state, action) => {
                state.status = 'idle'
            })

            .addCase(blogPostById.fulfilled, (state, action) => {
                state.singlePost = action.payload
                state.status = 'idle'
            })
            .addCase(blogPostById.pending, (state, action) => {
                state.status = 'loading'
            })

            .addCase(blogPostById.rejected, (state, action) => {
                state.status = 'error'
            })

            .addCase(searchBlogPost.fulfilled, (state, action) => {
                if (action.payload.statusCode === 404) {
                    state.posts = [];
                    state.searchStatus = '404'
                }
                if (action.payload.statusCode === 200) {
                    state.posts = action.payload.postByTitle
                    state.searchStatus = 'idle'
                }
            })
            .addCase(searchBlogPost.pending, (state, action) => {
                state.searchStatus = 'loading'
            })
            .addCase(searchBlogPost.rejected, (state, action) => {
                state.searchStatus = 'error'
            })
    }
})

export default blogPostsSlice.reducer


export const searchBlogPost = createAsyncThunk('searchBlogPost/get', async (payload) => {
    const res = await fetch(`${endpoint}title?postTitle=${payload}`, {})
    const data = await res.json()
    return data
})

export const getBlogPosts = createAsyncThunk('blogPosts/get', async () => {
    const getRes = await fetch(endpoint, {})
    const res = await getRes.json()
    return res
})


export const postBlogPosts = createAsyncThunk('blogPosts/post', async (postPayload) => {
    const data = new FormData();
    data.append('category', postPayload.category)
    data.append('title', postPayload.title)
    data.append('cover', postPayload.cover)
    data.append('readTimeValue', postPayload.readTime.value)
    data.append('readTimeUnit', postPayload.readTime.unit)
    data.append('author', postPayload.author)
    data.append('content', postPayload.content)

    const postRes = await fetch(endpointInternal, {
        method: "POST",
        body: data,
        headers: {
            /* "Content-Type" : "multipart/form-data" */
        }
    });
    const res = await postRes.json();
})

export const blogPostById = createAsyncThunk('blogPosts/getById', async (id) => {
    try {
        const res = await fetch((endpoint + id), {})
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }

})