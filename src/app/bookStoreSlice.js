import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./apiService";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  favorites: [],
  bookDetail: null,
  status: "idle",
};

export const getBookListAsync = createAsyncThunk(
  "bookstore/getBookList",
  async (pageNum, limit, query) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    return response.data;
  }
);
export const getFavorieListAsync = createAsyncThunk(
  "bookstore/getFavoriteList",
  async () => {
    const response = await api.get("/favorites");
    return response.data;
  }
);
export const getBookDetailAsync = createAsyncThunk(
  "bookstore/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);
export const addFavoriteBookAsync = createAsyncThunk(
  "bookstore/addFavoriteBook",
  async (addingBook) => {
    const response = await api.post(`/favorites`, addingBook);
    return response.data;
  }
);
export const removeFavoriteBookAsync = createAsyncThunk(
  "bookstore/removeFavoriteBook",
  async (removedBookId) => {
    await api.delete(`/favorites/${removedBookId}`);
    return removedBookId;
  }
);
export const bookStoreSlice = createSlice({
  name: "bookStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBookListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      });
    builder
      .addCase(getBookDetailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetailAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getBookDetailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.bookDetail = action.payload;
      });
    builder
      .addCase(addFavoriteBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(addFavoriteBookAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites.push(action.payload);
        toast.success("The book has been added to the reading list!");
      });
    builder
      .addCase(getFavorieListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavorieListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(getFavorieListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites = action.payload;
      });
    builder
      .addCase(removeFavoriteBookAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavoriteBookAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(removeFavoriteBookAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.favorites = state.favorites.filter(
          (f) => f.id !== action.payload
        );
        toast.success("The book has been removed");
      });
  },
});
export default bookStoreSlice.reducer;
