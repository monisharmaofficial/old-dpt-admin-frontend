import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

const API_URL = `${config.baseUrl}`;

// Async thunk for getting destination content
export const getDestinationContent = createAsyncThunk(
  "destination/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-destinationnew`, {
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

// Async thunk for deleting a destination
export const deleteOurDestination = createAsyncThunk(
  "destination/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-destinationnew/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a destination name
export const updateDestinationName = createAsyncThunk(
  "destination/update",
  async ({
    id,
    newName,
    newDestination,
    newImage,
    newMetaTitle,
    newMetaDescription,
    newMetaKeyword,
    country,
    state,
  }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-destinationnew/${id}`,
        {
          destination_name: newName,
          image: newImage,
          destination_description: newDestination,
          meta_title: newMetaTitle,
          meta_description: newMetaDescription,
          meta_keyword: newMetaKeyword,
          country,
          state,
        },
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

// Async thunk for adding a new destination
export const addNewDestination = createAsyncThunk(
  "destination/addNew",
  async (newDestinationData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-destinationnew`,
        newDestinationData,
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

// Async thunk for getting destination country content
export const getDestinationCountry = createAsyncThunk(
  "destination/country",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/list-destinationnew-countery`,
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

export const getStatesForCountry = createAsyncThunk(
  "destination/getStates",
  async (countryId) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/list-destinationnew-state/${countryId}`,
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

// Define the destination slice
export const destinationSlice = createSlice({
  name: "destination",
  initialState: {
    isLoading: false,
    leads: [],
    destinationId: null,
    destinationStatus: "",
    destinationName: "",
    destinationImage: "",
    destination: "",
    destinationMetaTitle: "",
    destinationMetaKeyword: "",
    destinationMetaDescription: "",
    country: "",
    state: "",
    error: null,
  },
  reducers: {
    setDestinationData: (state, action) => {
      state.destinationId = action.payload.id;
      state.destinationName = action.payload.destination_name;
      state.destinationImage = action.payload.image;
      state.destinationStatus = action.payload.status;
      state.destination = action.payload.destination_description;
      state.destinationMetaDescription = action.payload.meta_description;
      state.destinationMetaKeyword = action.payload.meta_keyword;
      state.destinationMetaTitle = action.payload.meta_title;
      state.country = action.payload.country;
      state.state = action.payload.state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDestinationContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDestinationContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
      })
      .addCase(getDestinationContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurDestination.fulfilled, (state, action) => {
        state.leads = state.leads.filter(
          (destination) => destination.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteOurDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateDestinationName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDestinationName.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateDestinationName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Destination name:", action.error);
      })
      .addCase(addNewDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewDestination.fulfilled, (state, action) => {
        state.leads.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(addNewDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDestinationData } = destinationSlice.actions;

export default destinationSlice.reducer;
