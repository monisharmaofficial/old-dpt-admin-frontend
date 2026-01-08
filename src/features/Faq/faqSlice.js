import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting list-faq content
export const getFaqContent = createAsyncThunk(
  "faq/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-faq`, {
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

// Async thunk for deleting a faq
export const deleteOurFaq = createAsyncThunk(
  "faq/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-faq/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a faq name
export const updateFaqName = createAsyncThunk(
  "faq/update",
  async ({ id, newName,newDescription}) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-faq/${id}`, 
        { name: newName,description:newDescription },
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

// Async thunk for adding a new faq
export const addNewFaq = createAsyncThunk(
  "faq/addNew",
  async (newFaqData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-faq`,
        newFaqData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added faq data
    } catch (error) {
      throw error;
    }
  }
);

// Define the faq slice
export const faqSlice = createSlice({
  name: "faq",
  initialState: {
    isLoading: false,
    leads: [],
    faqId: null, 
    faqStatus:"",
    faqName: "",
    description:"", 
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setFaqData: (state, action) => {
      state.faqId = action.payload.id;
      state.faqName = action.payload.name;
      state.faqStatus = action.payload.status;
      state.deSCRIPTION = action.payload.description;
 
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFaqContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFaqContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFaqContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurFaq.fulfilled, (state, action) => {
        const deletedFaqId = action.payload;
        state.leads = state.leads.filter(
          (faq) => faq.id !== deletedFaqId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateFaqName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFaqName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateFaqName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Faq name:", action.error);
      })
      .addCase(addNewFaq.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewFaq.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Faq";
      });
  },
});

export const { deleteLead, setFaqData } = faqSlice.actions;

export default faqSlice.reducer;