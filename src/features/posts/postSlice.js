import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch(POSTS_URL);
    const data = await response.json();
    return data;
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
            state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    userId,
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const exisitingPost = state.posts.find(post => post.id === postId);
            if (exisitingPost) {
                exisitingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const loadPosts = action.payload.map(post => { 
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
            });
            state.posts = [...loadPosts];
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
});

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error; 

