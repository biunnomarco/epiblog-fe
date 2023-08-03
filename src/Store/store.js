import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "./authorSlice";
import blogPostsSlice from "./blogPostsSlice";
import themeSlice from "./themeSlice";
import loginSlice from "./loginSlice";
import commentsSlice from "./commentsSlice";

const store = configureStore({
    reducer: {
        authors: authorSlice,
        blogPosts: blogPostsSlice,
        theme: themeSlice,
        logIn: loginSlice,
        comment: commentsSlice,
    }
})

export default store;