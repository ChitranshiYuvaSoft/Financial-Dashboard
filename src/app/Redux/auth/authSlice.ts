import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
// import authServices from "./authService";

interface UserData {
  email: string;
  password: string;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface VerifyData {
  emailVerificationTOken: string;
  id: string;
}

interface User {
  email: string;
  password?: string;
  token: string;
}

interface InitialState {
  user: User | null;
  registerUser: RegisterUser | null;
  verificationMessage: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string;
  token: string;
}

const initialState: InitialState = {
  user: null,
  registerUser: null,
  verificationMessage: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserData & { token: string }>) => {
      const { email, token } = action.payload;
      localStorage.setItem("token", token);
      state.user = { email, token };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.pending, (state) => {
  //       state.isSuccess = false;
  //       state.isLoading = true;
  //     })
  //     .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
  //       state.isSuccess = true;
  //       state.isLoading = false;
  //       state.user = action.payload;
  //       localStorage.setItem("token", action.payload.token);
  //       state.token = action.payload.token;
  //     })
  //     .addCase(login.rejected, (state, action: PayloadAction<any>) => {
  //       state.isSuccess = false;
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload?.message || "Login failed";
  //     })
  //     .addCase(register.pending, (state) => {
  //       state.isLoading = true;
  //       state.isError = false;
  //       state.isSuccess = false;
  //     })
  //     .addCase(
  //       register.fulfilled,
  //       (state, action: PayloadAction<RegisterUser>) => {
  //         state.isLoading = false;
  //         state.isSuccess = true;
  //         state.registerUser = action.payload;
  //       }
  //     )
  //     .addCase(register.rejected, (state, action: PayloadAction<any>) => {
  //       state.isLoading = false;
  //       state.isSuccess = false;
  //       state.isError = true;
  //       state.message = action.payload?.message || "Registration failed";
  //     })
  //     .addCase(emailVerification.pending, (state) => {
  //       state.isLoading = true;
  //       state.isSuccess = false;
  //       state.isError = false;
  //     })
  //     .addCase(
  //       emailVerification.fulfilled,
  //       (state, action: PayloadAction<string>) => {
  //         state.isLoading = false;
  //         state.isSuccess = true;
  //         state.verificationMessage = action.payload;
  //         state.isError = false;
  //       }
  //     )
  //     .addCase(
  //       emailVerification.rejected,
  //       (state, action: PayloadAction<any>) => {
  //         state.isLoading = false;
  //         state.isSuccess = false;
  //         state.isError = true;
  //         state.message = action.payload?.message || "Verification failed";
  //       }
  //     );
  // },
});

// export const login = createAsyncThunk(
//   "LOGIN/USER",
//   async ({ email, password }: UserData) => {
//     try {
//       return await authServices.loginUser({ email, password });
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const register = createAsyncThunk(
//   "REGISTER/USER",
//   async ({ name, email, password }: RegisterUser) => {
//     try {
//       return await authServices.registerUser({ name, email, password });
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const emailVerification = createAsyncThunk(
//   "EMAIL/VERIFICATION",
//   async (data: VerifyData) => {
//     try {
//       return await authServices.verification(data);
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const { loginUser } = authSlice.actions;

export default authSlice.reducer;
