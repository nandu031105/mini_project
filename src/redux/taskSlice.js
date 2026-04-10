import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTasks, setLoading } = taskSlice.actions;
export default taskSlice.reducer;