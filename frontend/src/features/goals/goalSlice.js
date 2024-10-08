import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };

export const addGoal = createAsyncThunk(
    "goals/add",
    async(goalData, thunkAPI) => {
        try {
            // we are accessing a protected route so we need token
            // thunkAPI has a get state method which can get any state
            const token = thunkAPI.getState().auth.user.token
            return await goalService.addGoal(goalData, token)
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
          }
    }
)

export const getGoals = createAsyncThunk(
    "goals/getAll", 
    async (_, thunkAPI) => {
        try {
            // we are accessing a protected route so we need token
            // thunkAPI has a get state method which can get any state
            const token = thunkAPI.getState().auth.user.token
            return await goalService.getGoals(token)
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
          } 
    }
)

export const deleteGoal = createAsyncThunk(
    "goals/delete",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token)
        }catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkAPI.rejectWithValue(message);
          } 
    }
)

// export const updatedGoal = createAsyncThunk(
//     "",
//     async(goal, thunkAPI) => {
//         try {
//             return await goalService.addGoal(goal)
//         }catch (error) {
//             const message =
//               (error.response &&
//                 error.response.data &&
//                 error.response.data.message) ||
//               error.message ||
//               error.toString();
//             return thunkAPI.rejectWithValue(message);
//           }
//     } 
// )

export const goalSlice = createSlice({
    name:"goal",
    initialState,
    reducers:{
        // here we wanted everything to go
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // state.message = action.payload;
                state.goals.push(action.payload);
            })
            .addCase(addGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // if we filter and return on fullfilled, removed from ui right away
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
