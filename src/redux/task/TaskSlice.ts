import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Priority, Status, TaskDetail, TaskType } from "model";
import { task } from "services/Task";

export interface TaskState {
  getTaskDetail: any;
  getProjectDetail: TaskDetail | null;
  getAllStatus: Status[] | null;
  getTaskType: TaskType[] | null;
  getPriority: Priority[] | null;
}
const initialState: TaskState = {
  getTaskDetail: null,
  getProjectDetail: null,
  getAllStatus: null,
  getTaskType: null,
  getPriority: null,
};

export const CreateTask = createAsyncThunk(
  "task/createTask",
  async (data: any, thunkAPI) => {
    try {
      const result = await task.createTask(data);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (data: any, thunkAPI) => {
    try {
      const result = await task.updateTask(data);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getProjectDetails = createAsyncThunk(
  "task",
  async (id: string | undefined, thunkAPI) => {
    try {
      const result = await task.getProjectDetail(id);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getTaskDetails = createAsyncThunk(
  "task/detail",
  async (id: undefined | string, thunkAPI) => {
    try {
      const result = await task.getTaskDetail(id);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllstatuss = createAsyncThunk(
  "task/statuss",
  async (thunkAPI) => {
    try {
      const result = await task.getAllstatus();
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllTaskTypes = createAsyncThunk(
  "task/task",
  async (thunkAPI) => {
    try {
      const result = await task.getAllTaskType();
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);
export const getAllPriority = createAsyncThunk(
  "task/Priority",
  async (thunkAPI) => {
    try {
      const result = await task.getAllPriority();
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getProjectDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProjectDetail = null;
          state.getProjectDetail = action.payload;
        }
      )
      .addCase(
        getTaskDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getTaskDetail = action.payload;
        }
      )
      .addCase(getAllstatuss.fulfilled, (state, action: PayloadAction<any>) => {
        state.getAllStatus = action.payload;
      })
      .addCase(
        getAllTaskTypes.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getTaskType = action.payload;
        }
      )
      .addCase(
        getAllPriority.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPriority = action.payload;
        }
      );
  },
});

export default taskSlice.reducer;
