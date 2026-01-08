import React from 'react';
import { useDispatch } from 'react-redux';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { deleteOurItinerary} from '../../Itinerary/itinerarySlice';
import { showNotification } from '../headerSlice';

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, id, type } = extraObject;

  const proceedWithYes = async () => {
    try {
      if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CONFIRMATION_ITINERARY) {
   
        await dispatch(deleteOurItinerary(id));
        dispatch(showNotification({ message: 'Itinerary Deleted!', status: 1 }));
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
   
      }
    } catch (error) {
      console.error('Error handling confirmation:', error);
    }
    closeModal(); 
  };

  return (
    <>
      <p className="text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline" onClick={() => closeModal()}>
          Cancel
        </button>

        <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
