import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get } from 'lodash';
import { BASE_URL, config } from '@src/config';

// Асинхронный thunk для загрузки команд
export const fetchTeamsList = createAsyncThunk(
  'list/fetchTeamsList',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const request = `${BASE_URL}/teams?limit=${limit}&offset=${offset}`;
    console.log('fetchTeamsList:', { request });
    const { data } = await axios.get(request, config);
    console.log('fetchTeamsList:', { data });
    // Возвращаем массив команд
    return get(data, ['teams'], []);
  },
);

type InitialState = {
  items: [];
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: null | undefined | string;
};

const initialState: InitialState = {
  items: [],
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setReset: () => initialState,
  },
  selectors: {
    itemsSelector: (state: InitialState) => state.items,
    currentPageSelector: (state: InitialState) => state.currentPage,
    pageSizeSelector: (state: InitialState) => state.pageSize,
    loadingSelector: (state: InitialState) => state.loading,
    errorSelector: (state: InitialState) => state.error,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeamsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTeamsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const listActions = listSlice.actions;
export const listSelectors = listSlice.selectors;
export default listSlice;
