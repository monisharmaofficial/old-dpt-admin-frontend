import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting review content
export const getReviewsContent = createAsyncThunk(
  "reviews/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-reviews`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for deleting a review
export const deleteOurReviews = createAsyncThunk(
  "/delete-reviews",
  async (id = 2) => {
    try {
      await axios.delete(`${API_URL}/delete-reviews/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a review name
export const viewReviews = createAsyncThunk(
  "reviews/view",
  async ({ id}) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/edit-reviews/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for adding a new review
export const addNewReviews = createAsyncThunk(
  "reviews/addNew",
  async (newReviewsData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-reviews`,
        newReviewsData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added review data
    } catch (error) {
      throw error;
    }
  }
);


// Define the review slice
export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    isLoading: false,
    leads: [],
    reviewsId: null, 
    reviewsName: "",
    reviewsEmail:"", 
    reviewsCountry: "",
    reviewsRating:"", 
    reviewsComments: "",
    reviewsStatus: "",
    error: null,
  },
  reducers: {
    setReviewsData: (state, action) => {
      const { id, name, email, country, rating, comments,status } = action.payload;
      state.reviewsId = id;
      state.reviewsName = name;
      state.reviewsEmail = email;
      state.reviewsCountry = country;
      state.reviewsStatus = status;
      state.reviewsRating = rating;
      state.reviewsComments = comments;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviewsContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getReviewsContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurReviews.fulfilled, (state, action) => {
        const deletedReviewsId = action.payload;
        state.leads = state.leads.filter(
          (reviews) => reviews.id !== deletedReviewsId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(viewReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(viewReviews.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(viewReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating review name:", action.error);
      })
      .addCase(addNewReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewReviews.fulfilled, (state, action) => {
        state.leads.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new  review";
      });
  },
});

export const { deleteLead, setReviewsData } = reviewsSlice.actions;

export default reviewsSlice.reducer;