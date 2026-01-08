import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting category content
export const getCategoryContent = createAsyncThunk(
  "category/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-category`, {
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

// Async thunk for deleting a category
export const deleteOurCategory = createAsyncThunk(
  "category/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-category/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a category name
export const updateCategoryName = createAsyncThunk(
  "category/update",
  async ({ id, newName, newImage,newSlug,parent_id,newShortDescription,newDescription ,newMetaTitle,newMetaDescription,newMetaKeyword }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-category/${id}`, 
        { name: newName,slug:newSlug,image:newImage,parent_id:parent_id,short_description:newShortDescription,description:newDescription,meta_title:newMetaTitle,meta_description:newMetaDescription,meta_keywords:newMetaKeyword },
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

// Async thunk for adding a new category
export const addNewCategory = createAsyncThunk(
  "category/addNew",
  async (newCategoryData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-category`,
        newCategoryData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added category data
    } catch (error) {
      throw error;
    }
  }
);

// Define the category slice
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    leads: [],
    categoryId: null, 
    categoryName: "",
    categoryStatus:"",
    categorySlug:"",
    categoryImage:"",
    categoryParentId:"", 
    categoryMetaTitle:"",
    categoryShortDescription:"",
    categoryDescription:"",
    categoryMetaDescription:"",
    categoryMetaKeyword:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setCategoryData: (state, action) => {
      state.categoryId = action.payload.id;
      state.categoryName = action.payload.name;
      state.categoryImage = action.payload.image;
      state.categorySlug = action.payload.slug;
      state.categoryStatus = action.payload.status;
      state.categoryParentId = action.payload.parent_id;
      state.categoryMetaTitle = action.payload.meta_title;
      state.categoryShortDescription = action.payload.short_description;
      state.categoryDescription = action.payload.description;
      state.categoryMetaDescription = action.payload.meta_description;
      state.categoryMetaKeyword = action.payload.meta_keywords;
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCategoryContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurCategory.fulfilled, (state, action) => {
        const deletedCategoryId = action.payload;
        state.leads = state.leads.filter(
          (category) => category.id !== deletedCategoryId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategoryName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategoryName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCategoryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating category name:", action.error);
      })
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new category";
      });
  },
});

export const { deleteLead, setCategoryData } = categorySlice.actions;

export default categorySlice.reducer;