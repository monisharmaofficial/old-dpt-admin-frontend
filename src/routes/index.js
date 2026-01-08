import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));
const Category = lazy(() => import("../pages/protected/Category"));
const Itinerary = lazy(() => import("../pages/protected/Itinerary"));
const Tours = lazy(() => import("../pages/protected/Tours"));
const ToursApp = lazy(() => import("../pages/protected/ToursApp"));
const Page = lazy(() => import("../pages/protected/Page"));
const Agents = lazy(() => import("../pages/protected/Agents"));
const Destinations = lazy(() => import("../pages/protected/Destinations"));
const Destinationsnew = lazy(() =>
  import("../pages/protected/Destinationsnew")
);
const Review = lazy(() => import("../pages/protected/Review"));
const PageAdd = lazy(() => import("../pages/protected/PageAdd"));
const PageUpdate = lazy(() => import("../pages/protected/PageUpdate"));
const ToursUpdate = lazy(() => import("../pages/protected/ToursUpdate"));
const TourBooking = lazy(() => import("../pages/protected/TourBooking"));
const ToursBookingId = lazy(() =>
  import("../pages/protected/TourBookingDetails")
);
const TransferBooking = lazy(() =>
  import("../pages/protected/TransferBooking")
);
const VisaApplication = lazy(() =>
  import("../pages/protected/VisaApplication")
);
const Emirates = lazy(() => import("../pages/protected/Emirates"));
const Testimonial = lazy(() => import("../pages/protected/Testimonial"));
const TestimonialAdd = lazy(() => import("../pages/protected/TestimonialAdd"));
const TestimonialUpdate = lazy(() =>
  import("../pages/protected/TestimonialUpdate")
);
const AgentsAdd = lazy(() => import("../pages/protected/AgentsAdd"));
const AgentsUpdate = lazy(() => import("../pages/protected/AgentsUpdate"));
const CategoryAdd = lazy(() => import("../pages/protected/CategoryAdd"));
const CategoryUpdate = lazy(() => import("../pages/protected/CategoryUpdate"));
const ReviewAdd = lazy(() => import("../pages/protected/ReviewAdd"));
const ReviewUpdate = lazy(() => import("../pages/protected/ReviewUpdate"));
const EmiratesAdd = lazy(() => import("../pages/protected/EmiratesAdd"));
const EmiratesUpdate = lazy(() => import("../pages/protected/EmiratesUpdate"));
const LeadsAdd = lazy(() => import("../pages/protected/LeadsAdd"));
const LeadsUpdate = lazy(() => import("../pages/protected/LeadsUpdate"));
const DestinationsAdd = lazy(() =>
  import("../pages/protected/DestinationsAdd")
);
const DestinationsAddnew = lazy(() =>
  import("../pages/protected/DestinationsAddnew")
);
const DestinationsUpdate = lazy(() =>
  import("../pages/protected/DestinationsUpdate")
);
const DestinationsUpdatenew = lazy(() =>
  import("../pages/protected/DestinationsUpdatenew")
);
const ItineraryAdd = lazy(() => import("../pages/protected/ItineraryAdd"));
const ItineraryUpdate = lazy(() =>
  import("../pages/protected/ItineraryUpdate")
);
const ReviewDetail = lazy(() => import("../pages/protected/ReviewDetail"));
const HotelLocation = lazy(() => import("../pages/protected/HotelLocation"));
const HotelLocationAdd = lazy(() =>
  import("../pages/protected/HotelLocationAdd")
);
const HotelLocationUpdate = lazy(() =>
  import("../pages/protected/HotelLocationUpdate")
);
const Hotel = lazy(() => import("../pages/protected/Hotel"));
const HotelAdd = lazy(() => import("../pages/protected/HotelAdd"));
const HotelUpdate = lazy(() => import("../pages/protected/HotelUpdate"));
const UserData = lazy(() => import("../pages/protected/UserData"));
const FAQ = lazy(() => import("../pages/protected/Faq"));
const FAQAdd = lazy(() => import("../pages/protected/FaqAdd"));
const FAQUpdate = lazy(() => import("../pages/protected/FaqUpdate"));
const Attraction = lazy(() => import("../pages/protected/Attraction"));
const AttractionAdd = lazy(() => import("../pages/protected/AttractionAdd"));
const AttractionUpdate = lazy(() =>
  import("../pages/protected/AttractionUpdate")
);

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/category-add",
    component: CategoryAdd,
  },
  {
    path: "/category-update",
    component: CategoryUpdate,
  },
  {
    path: "/emirates",
    component: Emirates,
  },
  {
    path: "/emirates-add",
    component: EmiratesAdd,
  },
  {
    path: "/emirates-update",
    component: EmiratesUpdate,
  },
  {
    path: "/destinations",
    component: Destinationsnew,
  },
  {
    path: "/destinations-add",
    component: DestinationsAddnew,
  },
  {
    path: "/destinations-update",
    component: DestinationsUpdatenew,
  },
  {
    path: "Itinerary",
    component: Itinerary,
  },
  {
    path: "Itinerary-add",
    component: ItineraryAdd,
  },
  {
    path: "Itinerary-update",
    component: ItineraryUpdate,
  },
  {
    path: "/tours",
    component: Tours,
  },
  {
    path: "/tours-add",
    component: ToursApp,
  },
  {
    path: "tours-update",
    component: ToursUpdate,
  },
  {
    path: "user-data",
    component: UserData,
  },
  {
    path: "/tour-booking",
    name: "Tour Booking",
    component: TourBooking,
  },
  {
    path: "tours-booking",
    component: ToursBookingId,
  },
  {
    path: "/transfer-booking",
    name: "Transfer Service Booking",
    component: TransferBooking,
  },
  {
    path: "/visa-application",
    name: "Visa Application",
    component: VisaApplication,
  },
  {
    path: "/agents",
    component: Agents,
  },
  {
    path: "/add-agents",
    component: AgentsAdd,
  },
  {
    path: "/update-agents",
    component: AgentsUpdate,
  },

  {
    path: "/page",
    component: Page,
  },
  {
    path: "/page-add",
    component: PageAdd,
  },
  {
    path: "/page-update",
    component: PageUpdate,
  },
  // {
  //   path: "/destinations",
  //   component: Destinations,
  // },
  // {
  //   path: "/destinations-add",
  //   component: DestinationsAdd,
  // },
  // {
  //   path: "/destinations-update",
  //   component: DestinationsUpdate,
  // },
  {
    path: "/testimonial",
    component: Testimonial,
  },
  {
    path: "testimonial-add",
    component: TestimonialAdd,
  },
  {
    path: "/testimonial-update",
    component: TestimonialUpdate,
  },
  {
    path: "hotel-location",
    component: HotelLocation,
  },
  {
    path: "hotel-location-add",
    component: HotelLocationAdd,
  },
  {
    path: "hotel-location-update",
    component: HotelLocationUpdate,
  },
  {
    path: "hotel",
    component: Hotel,
  },
  {
    path: "hotel-add",
    component: HotelAdd,
  },
  {
    path: "hotel-update",
    component: HotelUpdate,
  },
  {
    path: "/welcome",
    component: Welcome,
  },
  {
    path: "/review",
    component: Review,
  },
  {
    path: "/review-add",
    component: ReviewAdd,
  },
  {
    path: "/review-update",
    component: ReviewUpdate,
  },
  {
    path: "/review-detail",
    component: ReviewDetail,
  },
  {
    path: "/faq",
    component: FAQ,
  },
  {
    path: "/faq-add",
    component: FAQAdd,
  },
  {
    path: "/faq-update",
    component: FAQUpdate,
  },
  {
    path: "/attraction",
    component: Attraction,
  },
  {
    path: "/attraction-add",
    component: AttractionAdd,
  },
  {
    path: "/attraction-update",
    component: AttractionUpdate,
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/leads-add",
    component: LeadsAdd,
  },
  {
    path: "/leads-update",
    component: LeadsUpdate,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
