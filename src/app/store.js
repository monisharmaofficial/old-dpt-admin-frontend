import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import categorySlice from "../features/category/categorySlice";
import agentsSlice from "../features/agents/agentsSlice";
import reviewsSlice from "../features/Review/reviewSlice";
import testimonialSlice from "../features/testimonial/testimonialSlice";
import emiratesSlice from "../features/Emirates/emiratesSlice";
import locationSlice from "../features/location/locationSlice";
import hotelSlice from "../features/hotel/hotelSlice";
import itinerarySlice from '../features/Itinerary/itinerarySlice';
import destinationSlice from '../features/Destinations/destinationSlice'
import tourSlice from "../features/tours/tourSlice";
import faqSlice from '../features/Faq/faqSlice'
import attractionSlice from '../features/attraction/attractionSlice'
import tourBookingSlice from '../features/TourBooking/tourBookingSlice'

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  category: categorySlice,
  agents: agentsSlice, // Corrected name here, remove the 'Slice' suffix
  reviews: reviewsSlice,
  testimonial: testimonialSlice,
  emirates:emiratesSlice,
  location:locationSlice,
  hotel:hotelSlice,
  itinerary:itinerarySlice,
  destination:destinationSlice,
  tour:tourSlice,
  faq:faqSlice,
  attraction:attractionSlice,
  tourBooking:tourBookingSlice
};

export default configureStore({
  reducer: combinedReducer,
});
