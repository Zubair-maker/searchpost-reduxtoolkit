import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
 
//get
export const getPost = createAsyncThunk('post/getPost' , async({id})=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
     .then((resp) => resp.json())
});

//Post
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

//Delete
export const deletePost = createAsyncThunk('post/deletePost' , async({id})=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
      method:"DELETE"
    }).then((resp) => resp.json())
});

//Edit
export const editPost = createAsyncThunk('post/editPost' , async({id,title,body})=>{
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
       method:'PUT',
       headers:{
        Accept:"application/json",
        'Content-Type':"application/json"
       },
       body: JSON.stringify({title,body})
    })
     .then((resp) => resp.json())
});

const initialState = {
   loading: false,
   post: [],
   error: null,
   body:"",
   edit:false
}

const searchPostSlice = createSlice({
    name: 'searchPost',
    initialState,
    reducers:{
        updatePost:(state, action)=>{
           state.body = action.payload.body;
           state.edit = action.payload.edit;
        }
    },
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
        });
        builder.addCase(deletePost.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(deletePost.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = action.payload;
        });
        builder.addCase(deletePost.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(editPost.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(editPost.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = [action.payload];
        });
        builder.addCase(editPost.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default searchPostSlice.reducer
export const {updatePost}  = searchPostSlice.actions