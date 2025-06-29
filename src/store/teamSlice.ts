import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, config } from '@src/config';

// Асинхронный thunk для загрузки информации о команде
export const fetchTeamsId = createAsyncThunk(
  'list/fetchTeamsId',
  async ({ id }: { id: number }) => {
    const request = `${BASE_URL}/teams/${id.toString()}`;
    console.log('fetchTeamsId:', { request });
    const { data } = await axios.get(request, config);
    console.log('fetchTeamsId:', { data });
    // Возвращаем данные о команде
    return data ?? {};
  },
);

// Асинхронный thunk для загрузки информации о предстоящих матчах
export const fetchTeamsIdMatches = createAsyncThunk(
  'list/fetchTeamsIdMatches',
  async ({ id }: { id: number }) => {
    const params = { status: 'SCHEDULE' };
    const request = `${BASE_URL}/teams/${id.toString()}/matches?status=SCHEDULED`;
    // const request = `${BASE_URL}/teams/${id.toString()}/matches`;
    console.log('fetchTeamsIdMatches:', { request });
    const { data } = await axios.get(request, config);
    console.log('fetchTeamsIdMatches:', { data });
    // Возвращаем данные о предстоящих матчах
    return data ?? {};
  },
);

type InitialState = {
  team: {};
  scheduled: {};
  loading: boolean;
  error: null | undefined | string;
};

const initialState: InitialState = {
  team: {},
  scheduled: {},
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setReset: () => initialState,
  },
  selectors: {
    itemsSelector: (state: InitialState) => state.team,
    scheduledSelector: (state: InitialState) => state.scheduled,
    loadingSelector: (state: InitialState) => state.loading,
    errorSelector: (state: InitialState) => state.error,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeamsId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsId.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchTeamsId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.team = {};
      })
      .addCase(fetchTeamsIdMatches.pending, state => {
        state.loading = true;
        state.error = null;
      })
      //
      .addCase(fetchTeamsIdMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduled = action.payload;
      })
      .addCase(fetchTeamsIdMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.scheduled = {};
      });
  },
});

export const teamActions = teamSlice.actions;
export const teamSelectors = teamSlice.selectors;
export default teamSlice;
