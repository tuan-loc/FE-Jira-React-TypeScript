import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project, projects, register } from "model";

import { project } from "services/Project";

interface category {
  id: number;
  projectCategoryName: string;
}

export interface ProjectState {
  ALlproject: Project[] | null | any;
  ProjectCategory: category[] | null;
  project: projects | null;
  getuserbyproject: register[] | null | any;
}
const initialState: ProjectState = {
  ALlproject: null,
  ProjectCategory: null,
  project: null,
  getuserbyproject: null,
};
export const projectAsync = createAsyncThunk(
  "project/all",
  async (thunkAPI) => {
    try {
      const result = await project.getAllproject();

      console.log(result);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const projectcatagoryAsync = createAsyncThunk(
  "project/catagory",
  async (thunkAPI) => {
    try {
      const result = await project.getcategory();

      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const CreateProjectAsync = createAsyncThunk(
  "project/create",
  async (data: projects, thunkAPI) => {
    try {
      const result = await project.createproject(data);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);
export const UpdateProjectAsync = createAsyncThunk(
  "project/update",
  async (data: any, thunkAPI) => {
    try {
      const result = await project.updateproject(data);
      console.log(result);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getprojectbyid = createAsyncThunk(
  "project",
  async (id: string | undefined | number, thunkAPI) => {
    try {
      const result = await project.getprojectbyid(id);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const getuserbyprojects = createAsyncThunk(
  "project/getuserbyprojects",
  async (id: string | undefined | number, thunkAPI) => {
    try {
      const result = await project.getUserByProjectId(id);
      return result.data.content;
    } catch (error) {
      throw error;
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.ALlproject = action.payload;
      })
      .addCase(
        projectcatagoryAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.ProjectCategory = action.payload;
        }
      )
      .addCase(
        getprojectbyid.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.project = null;
          state.project = action.payload;
        }
      )
      .addCase(
        getuserbyprojects.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.project = null;
          state.getuserbyproject = action.payload;
        }
      );
  },
});

export default projectSlice.reducer;
