import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting tourBooking content
export const getTourBookingContent = createAsyncThunk(
  "tourBooking/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/booking/list-tour`, {
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


// Define the tourBooking slice
export const tourBookingSlice = createSlice({
  name: "tourBooking",
  initialState: {
    isLoading: false,
    leads: [],
    tourBookingId: null, 
    tourBookingStatus:"",
    tourBookingName: "",
    tourBookingImage:"",
    tourBooking:"", 
    tourBookingMetaTitle:"",
    tourBookingMetaKeyword:"",
    tourBookingMetaDescription:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setTourBookingData: (state, action) => {
      state.tourBookingId = action.payload.id;
      state.tourBookingName = action.payload.tourBooking_name;
      state.tourBookingImage = action.payload.image;
      state.tourBookingStatus = action.payload.status;
      state.tourBooking = action.payload.tourBooking_description;
      state.tourBookingMetaDescription = action.payload.meta_description;
      state.tourBookingMetaKeyword = action.payload.meta_keyword;
      state.tourBookingMetaTitle = action.payload.meta_title;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTourBookingContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTourBookingContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTourBookingContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
   
  },
});

export const { deleteLead, settourBookingData } = tourBookingSlice.actions;

export default tourBookingSlice.reducer;