import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewItinerary, getItineraryContent } from "../itinerarySlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_ITINERARY_OBJ = {
  itinerary_name: "",
  itinerary_description: "",

};

function AddItineraryModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [itineraryData, setItineraryData] = useState(INITIAL_ITINERARY_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    dispatch(getItineraryContent());
  }, [dispatch]);

  const { leads } = useSelector((state) => state.itinerary);

  
  const closeModal =()=>{
    navigate('/app/itinerary')
  }


  const uploadImageToPublicFolder = () => {
    const { itinerary_name, parent_id } = itineraryData;
  
    if (!itinerary_name) {
      setErrorMessage("Please enter a Itinerary name");
      return;
    }
  
    setLoading(true);
  
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const itinerary_description = JSON.stringify(rawContentState);
  
    dispatch(
      addNewItinerary({
        itinerary_name: itinerary_name,
        image: localStorage.getItem("filename"),
        parent_id: parent_id,
        itinerary_description: itinerary_description,
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New itinerary Added!", status: 1 }));
        setLoading(false);
  
        // Use the navigate function to navigate to the desired URL
        navigate("/app/itinerary");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding itinerary:", error);
        setErrorMessage("Error adding itinerary. Please try again.");
        setLoading(false);
      });
  };
  

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setItineraryData({ ...itineraryData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Itinerary" topMargin="mt-2" >
       

        <InputText
          type="text"
          defaultValue={itineraryData.itinerary_name}
          placeholder="Itinerary Name"
          updateType="itinerary_name"
          containerStyle="mt-4"
          labelTitle="Itinerary Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

       

        <label className="label font-semibold">
          <span className={"label-text text-base-content"}>Description</span>
        </label>

        <Editor
          editorState={editorState}
          onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
          editorStyle={{ border: "1px solid #e5e7eb" }}
        />


        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>Image</span>
        </label>

        <UploadSingleFiles />

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

export default AddItineraryModalBody;
