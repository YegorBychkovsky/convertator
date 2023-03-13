import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ConverterStateType, Status, FetchConvertType, FetchLoginParams } from './types';

const initialState: ConverterStateType = {
  currency1: '',
  currency2: '',
  value1: 0,
  value2: 0,
  status: Status.LOADING,
  response: null,
};

export const fetchingConvert = createAsyncThunk<FetchConvertType, FetchLoginParams>(
  'converter/fetchCurrency',
  async (params) => {
    const { url } = params;
    const { data } = await axios.get<FetchConvertType>(url);

    console.log(data);

    return data;
  },
);

export const AuthorizationSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    addValue1(state, action: PayloadAction<number>) {
      state.value1 = action.payload;
    },
    addValue2(state, action: PayloadAction<number>) {
      state.value2 = action.payload;
    },
    addCurrency1(state, action: PayloadAction<string>) {
      state.currency1 = action.payload;
    },
    addCurrency2(state, action: PayloadAction<string>) {
      state.currency2 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingConvert.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchingConvert.fulfilled, (state, action) => {
      state.response = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingConvert.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { addValue1, addValue2, addCurrency1, addCurrency2 } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
