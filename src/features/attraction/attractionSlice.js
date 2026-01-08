import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting attraction content
export const getAttractionContent = createAsyncThunk(
  "attraction/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-popular-attraction`, {
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

// Async thunk for deleting a attraction
export const deleteOurAttraction = createAsyncThunk(
  "attraction/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-popular-attraction/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a attraction name
export const updateAttractionName = createAsyncThunk(
  "attraction/update",
  async ({ id, newName,newSlug,newImage,newShortDescription,newDescription ,newMetaTitle,newMetaDescription,newMetaKeyword }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-popular-attraction/${id}`, 
        { name: newName,slug:newSlug,image:newImage,short_description:newShortDescription,description:newDescription,meta_title:newMetaTitle,meta_description:newMetaDescription,meta_keyword:newMetaKeyword},
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

// Async thunk for adding a new attraction
export const addNewAttraction = createAsyncThunk(
  "attraction/addNew",
  async (newAttractionData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-popular-attraction`,
        newAttractionData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added attraction data
    } catch (error) {
      throw error;
    }
  }
);

// Define the attraction slice
export const attractionSlice = createSlice({
  name: "attraction",
  initialState: {
    isLoading: false,
    leads: [],
    attractionId: null, 
    attractionName: "",
    attractionImage:"",
    attractionStatus:"",
    attractionSlug:"",
    attractionParentId:"", 
    attractionMetaTitle:"",
    attractionShortDescription:"",
    attractionDescription:"",
    attractionMetaDescription:"",
    attractionMetaKeyword:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setAttractionData: (state, action) => {
      state.attractionId = action.payload.id;
      state.attractionName = action.payload.name;
      state.attractionImage = action.payload.image;
      state.attractionSlug = action.payload.slug;
      state.attractionStatus = action.payload.status;
      state.attractionParentId = action.payload.parent_id;
      state.attractionMetaTitle = action.payload.meta_title;
      state.attractionShortDescription = action.payload.short_description;
      state.attractionDescription = action.payload.description;
      state.attractionMetaDescription = action.payload.meta_description;
      state.attractionMetaKeyword = action.payload.meta_keyword;
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttractionContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAttractionContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAttractionContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurAttraction.fulfilled, (state, action) => {
        const deletedAttractionId = action.payload;
        state.leads = state.leads.filter(
          (attraction) => attraction.id !== deletedAttractionId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurAttraction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateAttractionName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAttractionName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAttractionName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Attraction name:", action.error);
      })
      .addCase(addNewAttraction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewAttraction.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewAttraction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Attraction";
      });
  },
});

export const { deleteLead, setAttractionData } = attractionSlice.actions;

export default attractionSlice.reducer;