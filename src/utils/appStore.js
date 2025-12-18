import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectinoSlice';
import requestReducer from './requestSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    feed: feedReducer,
    connections: connectionReducer,
    request: requestReducer
  },
});

export default appStore;