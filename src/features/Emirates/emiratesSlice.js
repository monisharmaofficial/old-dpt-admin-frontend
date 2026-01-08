import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting emirates content
export const getEmiratesContent = createAsyncThunk(
  "emirates/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-emirates`, {
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

// Async thunk for deleting a emirates
export const deleteOurEmirates = createAsyncThunk(
  "emirates/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-emirates/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a emirates = createAsyncThunk(
export const updateEmiratesName = createAsyncThunk(
  "emirates/update",
  async ({ id,newCountry, newName,newImage,newMetaTitle, newMetaDescription,newMetaKeyword}) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-emirates/${id}`, 
        { destination_id:newCountry,name: newName,image:newImage,meta_title:newMetaTitle,meta_description:newMetaDescription,meta_keyword:newMetaKeyword },
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

// Async thunk for adding a new emirates
export const addNewEmirates = createAsyncThunk(
  "emirates/addNew",
  async (newEmiratesData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-emirates`,
        newEmiratesData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added emirates data
    } catch (error) {
      throw error;
    }
  }
);

// Define the emirates slice
export const emiratesSlice = createSlice({
  name: "emirates",
  initialState: {
    isLoading: false,
    leads: [],
    emiratesId: null, 
    emiratesName: "",
    emiratesImage:"",
    emiratesStatus:"",
    emiratesMetaTitle:"",
    emiratesMetaKeyword:"",
    emiratesMetaDescription:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setEmiratesData: (state, action) => {
      state.emiratesId = action.payload.id;
      state.destination_id = action.payload.destination_id;
      state.emiratesImage = action.payload.image;
      state.emiratesName = action.payload.name;
      state.emiratesStatus = action.payload.status;
      state.emiratesMetaDescription = action.payload.meta_description;
      state.emiratesMetaKeyword = action.payload.meta_keyword;
      state.emiratesMetaTitle = action.payload.meta_title;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmiratesContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmiratesContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getEmiratesContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurEmirates.fulfilled, (state, action) => {
        const deletedEmiratesId = action.payload;
        state.leads = state.leads.filter(
          (emirates) => emirates.id !== deletedEmiratesId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurEmirates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateEmiratesName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmiratesName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateEmiratesName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating emirates name:", action.error);
      })
      .addCase(addNewEmirates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewEmirates.fulfilled, (state, action) => {
        state.leads.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewEmirates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Emirates";
      });
  },
});

export const { deleteLead, setEmiratesData } = emiratesSlice.actions;

export default emiratesSlice.reducer;