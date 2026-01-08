import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorText from '../../../components/Typography/ErrorText';

const UpdateLeadModalBody=({ closeModal, lead })=> {
  const dispatch = useDispatch();
  const { leads } = useSelector(state => state.lead);

 console.log(leads[0].details)

  return (
    <>
      <div>
        <h3>{leads[0].details}</h3>
      </div>
    </>
  );
}

export default UpdateLeadModalBody;
