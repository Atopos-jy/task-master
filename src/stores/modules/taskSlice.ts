import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilterParams,
} from "@/types/task";
import { taskApi } from "@/api/task";

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
};

// Async Thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params?: TaskFilterParams) => {
    const response = await taskApi.getTasks(params);
    if (!response.message) {
      throw new Error(response.message);
    }
    return response.data;
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: CreateTaskDto) => {
    const response = await taskApi.createTask(data);
    if (!response.message) {
      throw new Error(response.message);
    }
    return response.data;
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }: { id: string; data: UpdateTaskDto }) => {
    const response = await taskApi.updateTask(id, data);
    if (!response.message) {
      throw new Error(response.message);
    }
    return response.data;
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const response = await taskApi.deleteTask(id);
    if (!response.message) {
      throw new Error(response.message);
    }
    return id;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.total = action.payload.length; // Simple count for now
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      // Create Task
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
        state.total += 1;
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
