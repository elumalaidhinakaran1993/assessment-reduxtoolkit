import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import DataTable from './DataTable';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <DataTable />
    </Provider>
  );
};

export default App;






