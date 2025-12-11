import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import messageReducer from './messageSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
})

export default appStore;