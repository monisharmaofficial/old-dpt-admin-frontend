import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting testimonial content
export const getTestimonialContent = createAsyncThunk(
  "testimonial/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-testimonial`, {
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

// Async thunk for deleting a testimonial
export const deleteOurTestimonial = createAsyncThunk(
  "/delete-testimonial",
  async (id = 2) => {
    try {
      await axios.delete(`${API_URL}/delete-testimonial/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a testimonial name
export const updateTestimonialName = createAsyncThunk(
  "testimonial/update",
  async ({ id, newName ,newDescription,newCountry, newRating }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-testimonial/${id}`, 
        { name: newName ,country:newCountry,description:newDescription,rating:newRating},
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

// Async thunk for adding a new testimonial
export const addNewTestimonial = createAsyncThunk(
  "testimonial/addNew",
  async (newTestimonialData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-testimonial`,
        newTestimonialData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added testimonial data
    } catch (error) {
      throw error;
    }
  }
);

// Define the testimonial slice
export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    isLoading: false,
    leads: [],
    testimonialId: null, 
    testimonialName: "",
    testimonialDescription:"",
    testimonialStatus:"",
    testimonialCountry:"",
    testimonialRating:"",
    error: null,
  },
  reducers: {
    setTestimonialData: (state, action) => {
      const { id, name,country,rating, description,status} = action.payload;
      state.testimonialId = id;
      state.testimonialStatus = status;
      state.testimonialName = name;
      state.testimonialCountry = country;
      state.testimonialRating = rating;
      state.testimonialDescription = description;
   
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonialContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTestimonialContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTestimonialContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurTestimonial.fulfilled, (state, action) => {
        const deletedTestimonialId = action.payload;
        state.leads = state.leads.filter(
          (testimonial) => testimonial.id !== deletedTestimonialId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTestimonialName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTestimonialName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTestimonialName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating testimonial name:", action.error);
      })
      .addCase(addNewTestimonial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewTestimonial.fulfilled, (state, action) => {
        state.leads.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new   testimonial";
      });
  },
});

export const { deleteLead, setTestimonialData } = testimonialSlice.actions;

export default testimonialSlice.reducer;