import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './actions';

const store = configureStore({
  reducer
})

export default store