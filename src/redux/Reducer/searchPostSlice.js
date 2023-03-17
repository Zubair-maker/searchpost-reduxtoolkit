import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
 

export const getPost = createAsyncThunk('post/getPost' , async({id})=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
     .then((resp) => resp.json())
});

export const createPost = createAsyncThunk('post/createPost' , async({formData})=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts/`,{
       method:'POST',
       headers:{
        Accept:"application/json",
        'Content-Type':"application/json"
       },
       body: JSON.stringify(formData)
    })
     .then((resp) => resp.json())
});

const initialState = {
   loading: false,
   post: [],
   error: null
}

const searchPostSlice = createSlice({
    name: 'searchPost',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getPost.pending ,(state, action)=>{
         state.loading = true;
        });
        builder.addCase(getPost.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = [action.payload];
        });
        builder.addCase(getPost.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        });
        builder.addCase(createPost.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createPost.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = [action.payload];
        });
        builder.addCase(createPost.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default searchPostSlice.reducer