import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewLocation, getLocationContent } from "../locationSlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_LOCATION_OBJ = {
  location_name: "",
};

function AddLocationModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [locationData, setLocationData] = useState(INITIAL_LOCATION_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    dispatch(getLocationContent());
  }, [dispatch]);

  const {  leads } = useSelector((state) => state.category);

  const uploadImageToPublicFolder = () => {
    const { location_name} = locationData;
  
    if (!location_name) {
      setErrorMessage("Please enter a location name");
      return;
    }
  
    setLoading(true);
  
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const description = JSON.stringify(rawContentState);
  
    dispatch(
      addNewLocation({
        location_name: location_name,
   
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New location Added!", status: 1 }));
        setLoading(false);
  
        // Use the navigate function to navigate to the desired URL
        navigate("/app/hotel-location");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding location:", error);
        setErrorMessage("Error adding location. Please try again.");
        setLoading(false);
      });
  };
  const closeModal =()=>{
    navigate('/app/hotel-location')
  }
  

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLocationData({ ...locationData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add location" topMargin="mt-2" >
      <InputText
      type="text"
      placeholder="Location Name"
      updateType="location_name"
      containerStyle="mt-4"
      labelTitle="Loation Name"
      updateFormValue={updateFormValue}
      isRequired={true}
    />
    



        {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={() => uploadImageToPublicFolder()}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default AddLocationModalBody;
