import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting itinerary content
export const getItineraryContent = createAsyncThunk(
  "itinerary/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-itinerary`, {
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

// Async thunk for deleting a itinerary
export const deleteOurItinerary = createAsyncThunk(
  "itinerary/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-itinerary/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a itinerary name
export const updateItineraryName = createAsyncThunk(
  "itinerary/update",
  async ({ id, newName,newImage,newDescription  }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-itinerary/${id}`, 
        { itinerary_name: newName,image:newImage,itinerary_description:newDescription },
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

// Async thunk for adding a new itinerary
export const addNewItinerary = createAsyncThunk(
  "itinerary/addNew",
  async (newItineraryData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-itinerary`,
        newItineraryData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added itinerary data
    } catch (error) {
      throw error;
    }
  }
);

// Define the itinerary slice
export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    isLoading: false,
    leads: [],
    itineraryId: null, 
    itineraryName: "",
    itineraryImage:"",
    itineraryStatus:"",
    itineraryParentId:"", 
    itineraryDescription:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setitineraryData: (state, action) => {
      state.itineraryId = action.payload.id;
      state.itineraryName = action.payload.itinerary_name;
      state.itineraryImage = action.payload.image;
      state.itineraryStatus = action.payload.status;
      state.itineraryParentId = action.payload.parent_id;
      state.itineraryDescription = action.payload.itinerary_description;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItineraryContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItineraryContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getItineraryContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurItinerary.fulfilled, (state, action) => {
        const deletedItineraryId = action.payload;
        state.leads = state.leads.filter(
          (itinerary) => itinerary.id !== deletedItineraryId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurItinerary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateItineraryName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItineraryName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateItineraryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Itinerary name:", action.error);
      })
      .addCase(addNewItinerary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewItinerary.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewItinerary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Itinerary";
      });
  },
});

export const { deleteLead, setItineraryData } = itinerarySlice.actions;

export default itinerarySlice.reducer;