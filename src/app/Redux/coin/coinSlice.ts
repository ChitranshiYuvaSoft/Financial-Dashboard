import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import coinServices from "./coinService";

interface InitialState {
  coins: string[];
  coin: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  coins: [],
  coin: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinData.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCoinData.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.coins = action.payload;
      })
      .addCase(getCoinData.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getCoinDetails.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCoinDetails.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.coin = action.payload;
      })
      .addCase(getCoinDetails.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const getCoinData = createAsyncThunk("GET/COINS", async () => {
  try {
    return await coinServices.getCoins();
  } catch (error) {
    console.log(error);
  }
});

export const getCoinDetails = createAsyncThunk("GET/COIN", async (id: any) => {
  try {
    return await coinServices.getCoin(id);
  } catch (error) {
    console.log(error);
  }
});

export default coinSlice.reducer;
