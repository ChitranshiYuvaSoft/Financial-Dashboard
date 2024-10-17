import { createSlice } from "@reduxjs/toolkit";

interface LineChartData {
  id: string;
  sales: string;
  purchase: string;
  month: string;
}

interface EditChartData {
  chartData: LineChartData | null;
  isEdit: boolean;
}

interface InitialState {
  lineChartData: LineChartData[];
  pieChartData: number[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  editChartData: EditChartData;
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
  editChartData: { chartData: null, isEdit: false },
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
      } else {
        state.lineChartData.push(action.payload);
      }
    },
    removeChartValue: (state, action) => {
      const index = action.payload;
      state.lineChartData.splice(index, 1);
    },
    editChartValue: (state, action) => {
      state.editChartData = { chartData: action.payload, isEdit: true };
    },
  },
  // extraReducers: (builder) => {
    // If you have extra reducers to handle async actions, implement them here
  // },
});

export const { createChartValue, removeChartValue, editChartValue } =
  chartSlice.actions;

export default chartSlice.reducer;
