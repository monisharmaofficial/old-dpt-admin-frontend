import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../config'

const API_URL = `${config.baseUrl}`;

// Async thunk for getting hotel content
export const getHotelContent = createAsyncThunk(
  "hotel/content",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/list-hotel`, {
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

// Async thunk for deleting a hotel
export const deleteOurHotel = createAsyncThunk(
  "hotel/delete",
  async (id = 1) => {
    try {
      await axios.delete(`${API_URL}/delete-hotel/${id}`);

      return id;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a hotel name
export const updateHotelName = createAsyncThunk(
  "hotel/update",
  async ({ id, newName,newLocationId,newDriverPriceAed,newDriverPriceUsd,newInfantsPriceAed,newInfantsPriceUsd,newChildrenPriceAed,newAdultPriceUsd,newInfantsPriceUsdnewChildrenPriceAed,newAdultPriceAed,newChildrenPriceUsd,
  }) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/update-hotel/${id}`, 
        { hotel_name: newName,location_id:newLocationId,adults_price_usd:newAdultPriceUsd,adults_price_aed:newAdultPriceAed,
          children_price_usd:newChildrenPriceUsd,
          children_price_aed:newChildrenPriceAed,
          infants_price_usd:newInfantsPriceUsd,
          infants_price_aed:newInfantsPriceAed,
          driver_price_usd:newDriverPriceUsd,
          driver_price_aed:newDriverPriceAed,},
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

// Async thunk for adding a new hotel
export const addNewHotel = createAsyncThunk(
  "hotel/addNew",
  async (newHotelData) => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/add-hotel`,
        newHotelData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      return response.data.data; // Return the newly added hotel data
    } catch (error) {
      throw error;
    }
  }
);

// Define the hotel slice
export const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    isLoading: false,
    leads: [],
    hotelId: null, 
    hotelName: "",
    hotelLocationId:"", 
    hotelMetaTitle:"",
    hotelShortDescription:"",
    hotelDescription:"",
    hotelMetaDescription:"",
    hotelStatus:"",
    hotelAdultPriceUsd:"",
    hotelAdultPriceAed:"",
    hotelChildrenPriceUsd:"",
    hotelChildrenPriceAed:"",
    hotelInfantsPriceUsd:"",
    hotelInfantsPriceAed:"",
    hotelDriverPriceUsd:"",
    hotelDriverPriceAed:"",
    error: null,
  },
  reducers: {
    // Define your reducers here if needed
    setHotelData: (state, action) => {
      state.hotelId = action.payload.id;
      state.hotelName = action.payload.hotel_name;
      state.hotelStatus = action.payload.status;
      state.locationId = action.payload.location_id;
      state.hotelMetaTitle = action.payload.meta_title;
      state.hotelShortDescription = action.payload.short_description;
      state.hotelDescription = action.payload.description;
      state.hotelMetaDescription = action.payload.meta_description;
      state.hotelStatus = action.payload.status;
      state.hotelAdultPriceUsd = action.payload.adults_price_usd;
      state.hotelAdultPriceAed = action.payload.adults_price_aed;
      state.hotelChildrenPriceUsd = action.payload.children_price_usd;
      state.hotelChildrenPriceAed = action.payload.children_price_aed;
      state.hotelInfantsPriceUsd = action.payload.infants_price_usd;
      state.hotelInfantsPriceAed = action.payload.infants_price_aed;
      state.hotelDriverPriceUsd = action.payload.driver_price_usd;
      state.hotelDriverPriceAed = action.payload.driver_price_aed;
      

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotelContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHotelContent.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getHotelContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOurHotel.fulfilled, (state, action) => {
        const deletedHotelId = action.payload;
        state.leads = state.leads.filter(
          (hotel) => hotel.id !== deletedHotelId
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOurHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateHotelName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHotelName.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateHotelName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error("Error updating Hotel name:", action.error);
      })
      .addCase(addNewHotel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewHotel.fulfilled, (state, action) => {
        state.leads.push(action.payload); // Add the new data to the end of the array
        state.leads.reverse(); // Reverse the order of the array
        state.isLoading = false;
        state.error = null;
      })
      
      .addCase(addNewHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
          ? action.error.message
          : "Failed to add a new Hotel";
      });
  },
});

export const { deleteLead, setHotelData } = hotelSlice.actions;

export default hotelSlice.reducer;