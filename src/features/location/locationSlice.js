import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting location content
export const getLocationContent = createAsyncThunk(
  "location/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-location`, {
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

// Async thunk for deleting a location
export const deleteOurLocation = createAsyncThunk(
  "location/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-location/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a location name
export const updateLocationName = createAsyncThunk(
  "location/update",
  async ({ id, newName,newShortDescription,newDescription ,newMetaTitle,newMetaDescription }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-location/${id}`, 
        { location_name: newName,short_description:newShortDescription,description:newDescription,meta_title:newMetaTitle,meta_description:newMetaDescription },
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

// Async thunk for adding a new location
export const addNewLocation = createAsyncThunk(
  "location/addNew",
  async (newLocationData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-location`,
        newLocationData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added location data
    } catch (error) {
      throw error;
    }
  }
);

// Define the location slice
export const locationSlice = createSlice({
  name: "location",
  initialState: {
    isLoading: false,
    locations: [],
    locationId: null, 
    locationName: "",
    locationStatus:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setLocationData: (state, action) => {
      state.locationId = action.payload.id;
      state.locationStatus = action.payload.status;
      state.locationName = action.payload.location_name;
    
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLocationContent.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getLocationContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurLocation.fulfilled, (state, action) => {
        const deletedLocationId = action.payload;
        state.locations = state.locations.filter(
          (location) => location.id !== deletedLocationId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateLocationName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLocationName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateLocationName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Location name:", action.error);
      })
      .addCase(addNewLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewLocation.fulfilled, (state, action) => {
        state.locations.push(action.payload); // Add the new data to the end of the array
        state.locations.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Location";
      });
  },
});

export const { deleteLead, setLocationData } = locationSlice.actions;

export default locationSlice.reducer;