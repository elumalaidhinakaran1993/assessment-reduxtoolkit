import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  searchText: "",
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.currentPage = 1;
    }
  },
});

export const {setFilteredData,setCurrentPage,setSearchText  , fetchDataStart, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;

export default apiSlice.reducer;