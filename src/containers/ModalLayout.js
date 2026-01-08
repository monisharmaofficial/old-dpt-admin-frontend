import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import AddLeadModalBody from "../features/leads/components/AddLeadModalBody";
import AddCategoryModalBody from "../features/category/components/AddCategoryModalBody";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import ConfirmationAgentsBody from "../features/common/components/ConFirmModalBodyAgents";
import ConfirmationReviewBody from "../features/common/components/ReviewConfirmationDelete";
import ConfirmationTestimonialBody from "../features/common/components/TestmonialDeleteBody";
import ConfirmationEmiratesBody from "../features/common/components/EmiratesConfitmationModel";
import ConfirmationLocationBody from "../features/common/components/LocationConfirmationModel";
import ConfirmationHotelBody from "../features/common/components/HotelConfirmationModel";
import ConfirmationItineraryBody from "../features/common/components/ItineraryConfirmationModel";
import AddAgentModalBody from "../features/agents/components/AddAgentModalBody";
import AddDesignationModalBody from "../features/Destinations/components/AddDestinationModalBody";
import AddReviewModalBody from "../features/Review/components/AddReviewModalBody";
import AddTourModalBody from "../features/tours/components/AddTour";
import UpdateTourModalBody from "../features/tours/components/UpdateTour";
import UpdateCategoryModalBody from "../features/category/components/UpdateCategoryModalBody";
import UpdateAgentModalBody from "../features/agents/components/UpdateAgentModalBody";
import AddPageModalBody from "../features/page/components/AddPage";
import UpdatePageModalBody from "../features/page/components/AddPage";
import UpdateDesignationModalBody from "../features/Destinations/components/UpdateDestinationModalBody";
import ViewReviewModalBody from "../features/Review/components/ReviewDetailsPage";
import UpdateLeadModalBody from "../features/leads/components/UpdateLeadModalBody";
import AddEmiratesModalBody from "../features/Emirates/components/AddEmiratesModalBody";
import UpdateEmiratesModalBody from "../features/Emirates/components/UpdateEmiratesModalBody";
import TourDetails from "../features/tours/components/ViewDetails";
import AddItineraryModalBody from "../features/Itinerary/components/AddItineraryModalBody";
import UpdateItineraryModalBody from "../features/Itinerary/components/UpdateItineraryModalBody";
import AddTestimonialModalBody from "../features/testimonial/components/AddTestimonial";
import UpdateTestimonialModalBody from "../features/testimonial/components/UpdateTestimonial";
import ConfirmationDestionationBody from "../features/common/components/DestionationConfirmationModel";
import ConfirmationDestionationBodynew from "../features/common/components/DestionationConfirmationModelnew";
import ConfirmationTourBody from "../features/common/components/TourConfirmationModel";
import AddFaqModalBody from "../features/Faq/components/AddFaqModalBody";
import UpdateFaqModalBody from "../features/Faq/components/UpdateFaqModalBody";
import ConfirmationFaqBody from "../features/common/components/FaqConfirmationModel";
import AddAttractionModalBody from "../features/attraction/components/AddAttractionModalBody";
import UpdateAttractionModalBody from "../features/attraction/components/UpdateAttractionModalBody";
import ConfirmationAttractionBody from "../features/common/components/AttractionModelBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title, details } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>
          <h2>{details}</h2>

          {/* Loading modal body according to different modal type */}

          {
            {
              [MODAL_BODY_TYPES.AGENT_ADD_NEW]: (
                <AddAgentModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.AGENT_UPDATE_NEW]: (
                <UpdateAgentModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PAGE_ADD_NEW]: (
                <AddPageModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PAGE_UPDATE_NEW]: (
                <UpdatePageModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TESTIMONIAL_ADD_NEW]: (
                <AddTestimonialModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TESTIMONIAL_UPDATE_NEW]: (
                <UpdateTestimonialModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ITINERARY_ADD_NEW]: (
                <AddItineraryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ITINERARY_UPDATE_NEW]: (
                <UpdateItineraryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TOUR_ADD_NEW]: (
                <AddTourModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TOUR_DETAILS]: (
                <TourDetails closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.REVIEW_ADD_NEW]: (
                <AddReviewModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.REVIEW_UPDATE_NEW]: (
                <ViewReviewModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.DESTINATION_ADD_NEW]: (
                <AddDesignationModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.DESTINATION_UPDATE_NEW]: (
                <UpdateDesignationModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                <AddLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.LEAD_UPDATE_NEW]: (
                <UpdateLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CATEGORY_ADD_NEW]: (
                <AddCategoryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CATEGORY_UPDATE_NEW]: (
                <UpdateCategoryModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EMIRATES_ADD_NEW]: (
                <AddEmiratesModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EMIRATES_UPDATE_NEW]: (
                <UpdateEmiratesModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TOUR_UPDATE_NEW]: (
                <UpdateTourModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_AGENTS]: (
                <ConfirmationAgentsBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_REVIEW]: (
                <ConfirmationReviewBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_TESTIMONIAL]: (
                <ConfirmationTestimonialBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_EMIRATES]: (
                <ConfirmationEmiratesBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_LOCATION]: (
                <ConfirmationLocationBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_HOTEL]: (
                <ConfirmationHotelBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_ITINERARY]: (
                <ConfirmationItineraryBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_DESTINATION]: (
                <ConfirmationDestionationBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_DESTINATION]: (
                <ConfirmationDestionationBodynew
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_TOUR]: (
                <ConfirmationTourBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.FAQ_ADD_NEW]: (
                <AddFaqModalBody closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.FAQ_UPDATE_NEW]: (
                <UpdateFaqModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_FAQ]: (
                <ConfirmationFaqBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.ATTRACTION_ADD_NEW]: (
                <AddAttractionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ATTRACTION_UPDATE_NEW]: (
                <UpdateAttractionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION_ATTRACTION]: (
                <ConfirmationAttractionBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),

              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
