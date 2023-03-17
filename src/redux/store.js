import { configureStore } from "@reduxjs/toolkit";
import searchPostReducer from './Reducer/searchPostSlice'

const store = configureStore({
    reducer:{
        searchPost: searchPostReducer
    }
});

export default store;