import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config' 

const API_URL = `${config.baseUrl}`;

// Async thunk for getting tour content
export const getTourContent = createAsyncThunk(
  "tour/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-tour`, {
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

export const editTourContent = createAsyncThunk(
  "tour/edit",
  async ({ id}) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/edit-tour/${id}`, {
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
// Async thunk for deleting a tour
export const deleteOurTour = createAsyncThunk(
  "tour/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-tour/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a tour name
export const updateTourName = createAsyncThunk(
  "tour/update",
  async ({ id, newImage,newGalleryData,newName,newCategoryId,newSlug,newItineraryId,newStickerId,newEmiratesId ,newHastag,newDiscount,newIntro,newMetaTitle,newMetaDescription,
    newTourDetails,newQuestion,newUseful,newMailBody,newIncluded,newExclusive,newExpect,newPolicy,newKnow,newAskedQuestion,newPriceAed,
    newPriceUsd,newTourDuration,newMetaKeywords,newTourDestination,newPopularTour}) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-tour/${id}`, 
        { tour_name: newName,image:newImage,gallerydata:newGalleryData,sticker: newStickerId,slug:newSlug,category_id:newCategoryId,itinerary_id:newItineraryId,emirates_id:newEmiratesId,hastag:newHastag,discount:newDiscount,intro:newIntro,
            tour_details:newTourDetails,question:newQuestion,useful:newUseful,mail_body:newMailBody,included:newIncluded,exclusive:newExclusive,
             expect:newExpect,policy:newPolicy, know:newKnow,asked_questions:newAskedQuestion,tour_price_aed:newPriceAed,
             tour_price_usd:newPriceUsd,tour_duration:newTourDuration,destination_id:newTourDestination,
             meta_keywords:newMetaKeywords,meta_title:newMetaTitle,meta_description:newMetaDescription,popular_tours:newPopularTour },
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

// Async thunk for adding a new tour
export const addNewTour = createAsyncThunk(
  "tour/addNew",
  async (newTourData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-tour`,
        newTourData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added tour data
    } catch (error) {
      throw error;
    }
  }
);

// Define the tour slice
export const tourSlice = createSlice({
  name: "tour",
  initialState: {
    isLoading: false,
    leads: [],
    tourId: null, 
    tourName: "",
    tourImage:"",
    tourGalleryData:"",
    categoryId:"",
    tourSlug:"",
    destinationId:"",
    tourStatus:"",
    emiratesId:"",
    stickerId:"",
    tourHashtag:"",
    tourDiscount:"",
    tourIntro:"",
    tourDetails:"",
    tourQuestion:"",
    tourMailBody:"",
    tourIncluded:"",
    tourExclusive:"", 
    tourExpect:"", 
    tourAskedQuestions:"", 
    tourPriceAed:"", 
    tourPriceUsd:"", 
    tourDuration:"", 
    tourPolicy:"", 
    tourKnow:"", 
    tourMetaTitle:"",
    tourMetaKeyword:"",
    tourMetaDescription:"",
    popularTour:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setTourData: (state, action) => {
      state.tourId = action.payload.id;
      state.tourName = action.payload.tour_name;
      state.tourImage = action.payload.image;
      state.tourGalleryData = action.payload.gallerydata;
      
      state.tourSlug = action.payload.slug;
      state.tourStatus = action.payload.status;
      state.categoryId = action.payload.category_id;
      state.destinationId = action.payload.destination_id;
      state.emiratesId = action.payload.emirates_id;
      state.popularTour = action.payload.popular_tours;
      state.stickerId = action.payload.sticker;
      state.tourHashtag = action.payload.hastag;
      state.tourDiscount = action.payload.discount;
      state.tourIntro = action.payload.intro;
      state.tourDetails = action.payload.tour_details;
      state.tourQuestion = action.payload.question;
      state.tourMailBody = action.payload.mail_body;
      state.tourIncluded = action.payload.included;
      state.tourExclusive = action.payload.exclusive;
      state.tourExpect = action.payload.expect;
      state.tourAskedQuestions = action.payload.asked_questions;
      state.tourPriceAed = action.payload.tour_price_aed;
      state.tourPriceUsd = action.payload.tour_price_usd;
      state.tourDuration = action.payload.tour_duration;
      state.tourPolicy = action.payload.policy;
      state.tourKnow = action.payload.know;
    //   state.tourExclusive = action.payload.exclusive;
      state.tourStatus = action.payload.status;
      state.tourMetaTitle = action.payload.meta_title;
      state.tourMetaKeyword = action.payload.meta_keywords;
      state.tourMetaDescription = action.payload.meta_description;
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTourContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTourContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTourContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editTourContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTourContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editTourContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurTour.fulfilled, (state, action) => {
        const deletedTourId = action.payload;
        state.leads = state.leads.filter(
          (tour) => tour.id !== deletedTourId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurTour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTourName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTourName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTourName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Tour name:", action.error);
      })
      .addCase(addNewTour.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewTour.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewTour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Tour";
      });
  },
});

export const { deleteLead, setTourData } = tourSlice.actions;

export default tourSlice.reducer;