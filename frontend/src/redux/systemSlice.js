import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSystemData = createAsyncThunk('system/fetchSystemData', async () => {
  const response = await axios.get('http://localhost:4000/api/system');
  return response.data;
});

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSystemData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSystemData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default systemSlice.reducer;
