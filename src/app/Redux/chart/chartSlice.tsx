import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LineChartData {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

interface InitialState {
  lineChartData: LineChartData[];
  pieChartData: Number[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  editChartData: {};
  existingMonth: string;
}

const initialState: InitialState = {
  lineChartData: [
    { id: "1", sales: "400", purchase: "600", month: "March" },
    { id: "2", sales: "408", purchase: "400", month: "June" },
    { id: "3", sales: "600", purchase: "599", month: "January" },
  ],
  pieChartData: [15000, 10000, 5000],
  isSuccess: false,
  isLoading: false,
  isError: false,
  editChartData: { chartData: {}, isEdit: false },
  existingMonth: "",
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    createChartValue: (state, action) => {
      const find = state.lineChartData.find(
        (item) => item.month === action.payload.month
      );

      if (find) {
        find.sales = action.payload.sales;
        find.purchase = action.payload.purchase;
        // return {
        //   ...state,
        // };
      } else {
        // state.lineChartData.push(action.payload);
        return {
          ...state,
          lineChartData: [...state.lineChartData, action.payload],
        };
      }
      // return {
      //   ...state,
      //   lineChartData: [action.payload, ...state.lineChartData],
      // };
    },
    removeChartValue: (state, action) => {
      const index = action.payload;
      const data = [...state.lineChartData];
      data.splice(index, 1);

      return {
        ...state,
        lineChartData: data,
      };
    },
    editChartValue: (state, action) => {
      return {
        ...state,
        editChartData: { chartData: action.payload, isEdit: true },
      };
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { createChartValue, removeChartValue, editChartValue } =
  chartSlice.actions;

export default chartSlice.reducer;
