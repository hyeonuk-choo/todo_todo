import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const initialState = {
  todoCount: [],
  todos: [],
  category: [],
  isLoading: false,
  error: null,
};

export const __getCategory = createAsyncThunk(
  "getCategory",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/todo/category`, config);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postCategory = createAsyncThunk(
  "postCategory",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/todo/category`, payload, config);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteCategory = createAsyncThunk(
  "__deleteCategory",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/todo/category/${payload}`,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const __updateCategory = createAsyncThunk(
  "__updateCategory",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/todo/category/${payload.id}`,
        payload.title,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const __getTodoCount = createAsyncThunk(
  "getTodoCount",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${BASE_URL}/todo/achievement?date=${dayjs(payload).format(
          "YYYY-MM-DD"
        )}`,
        config
      );
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTodo = createAsyncThunk(
  "todo/getTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${BASE_URL}/todo?date=${dayjs(payload).format("YYYY-MM-DD")}`,
        config
      );
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodo = createAsyncThunk(
  "todo/postTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/todo`, payload, config);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload, payload.todoId, typeof payload.todoId);
      const data = await axios.put(
        `${BASE_URL}/todo/${payload.todoId}`,
        payload,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/todo/${payload}`,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __completeTodo = createAsyncThunk(
  "todo/completeTodo",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await axios.put(
        `${BASE_URL}/todo/${payload.todoId}`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {},
  extraReducers: {
    // __getCategory
    [__getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    },
    [__getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __postCategory
    [__postCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCategory.fulfilled]: (state, action) => {
      console.log('__postCategory action.payload', action.payload);
    },
    [__postCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __deleteCategory
    [__deleteCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = state.category.filter(
        (item) => item.id !== Number(action.payload)
      );
    },
    [__deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __updateCategory
    [__updateCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __getTodoCount
    [__getTodoCount.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodoCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todoCount = action.payload;
    },
    [__getTodoCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __getTodo
    [__getTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __postTodo
    [__postTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__postTodo.fulfilled]: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    [__postTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __updateTodo
    [__updateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodo.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        // 코드 변경했는데 작동하는지 확인하기
        if (todo.todoId === action.meta.arg.todoId) {
          todo.content = action.meta.arg.content;
          console.log(todo.todoId);
          // return { ...todo, complete: action.payload.complete };
        }
        return todo;
      });
    },
    [__updateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(state);
    },
    // __deleteTodo
    [__deleteTodo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter(
        (item) => item.todoId !== Number(action.payload)
      );
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __completeTodo
    [__completeTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__completeTodo.fulfilled]: (state, action) => {
      console.log(typeof action.meta.arg.todoId, action.meta.arg);
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        // 코드 변경했는데 작동하는지 확인하기
        if (todo.todoId === action.meta.arg.todoId) {
          todo.complete = action.meta.arg.isComplete;
          console.log(todo.complete);
          // return { ...todo, complete: action.payload.complete };
        }
        return todo;
      });
    },
    [__completeTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default plannerSlice.reducer;
