import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals : {
    message: '',
    data: []
  },
  isGoalError: false,
  isGoalSuccess:false,
  isGoalLoading: false,
  messageGoal: ''
}

export const getGoals = createAsyncThunk('goal/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token
    return await goalService.getGoals(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

// Create Goal
export const createGoal = createAsyncThunk('goal/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token
    return await goalService.setGoals(token, goalData)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

// Update Goal
export const updateGoal = createAsyncThunk('goal/update', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token
    return await goalService.updateGoal(goalData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    console.log(message)
    return thunkAPI.rejectWithValue(message);
  }
})

export const deleteGoal = createAsyncThunk('goal/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token
    return await goalService.deleteGoal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    resetGoal: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isGoalLoading = true
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isGoalLoading = false
        state.isGoalError = true
        state.messageGoal = action.payload
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isGoalLoading = false
        state.isGoalSuccess = true
        state.goals = action.payload
      })
      .addCase(createGoal.pending, (state) => {
        state.isGoalLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isGoalLoading = false
        state.isGoalSuccess = true
        state.goals.data.push(action.payload.data)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isGoalLoading = false
        state.isGoalError = true
        state.messageGoal = action.payload
      })
      .addCase(updateGoal.pending, (state) => {
        state.isGoalLoading = true
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isGoalLoading = false
        state.isGoalSuccess = true
        state.goals.data = state.goals.data.map((goal) => {
          return goal._id === action.payload.data._id ? action.payload.data : goal
        })
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isGoalLoading = false
        state.isGoalError = true
        state.messageGoal = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isGoalLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        console.log(state.goals.data)
        console.log(action.payload.data._id)
        state.isGoalLoading = false
        state.isGoalSuccess = true
        state.goals.data = state.goals.data.filter(
          (goal) => goal._id !== action.payload.data._id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isGoalLoading = false
        state.isGoalError = true
        state.messageGoal = action.payload
      })
  }
})

export const { resetGoal } = goalSlice.actions
export default goalSlice.reducer
