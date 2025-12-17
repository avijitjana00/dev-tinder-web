import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectinoSlice';  
const appStore = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default appStore;