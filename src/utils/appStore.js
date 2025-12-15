import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import feedReducer from './feedSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    feed: feedReducer,
  },
});

export default appStore;