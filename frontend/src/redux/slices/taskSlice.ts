import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, Task, TaskFilters } from '../../types/task';

const initialState: TasksState = {
  items: [],
  currentTask: null,
  loading: false,
  error: null,
  filters: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.currentTask?._id === action.payload._id) {
        state.currentTask = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task._id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<TaskFilters>) => {
      state.filters = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setTasks,
  setCurrentTask,
  addTask,
  updateTask,
  deleteTask,
  setFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;
