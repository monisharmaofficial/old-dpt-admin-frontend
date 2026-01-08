import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewDestination, getDestinationContent } from "../destinationSlice";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import TextAreaInput from "../../../components/Input/TextAreaInput";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_DESTINATION_OBJ = {
  name: "",
  parent_id: "",
  short_description: "",
  destination_description: "",
  meta_title: "",
  meta_description: ""
};

function AddDestionationModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [destinationData, setDestinationData] = useState(INITIAL_DESTINATION_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    dispatch(getDestinationContent());
  }, [dispatch]);


  const uploadImageToPublicFolder = () => {
    const { destination_name, parent_id,meta_description,meta_title,meta_keyword, destination_description} = destinationData;
  
    if (!destination_name) {
      setErrorMessage("Please enter a Country name");
      return;
    }
    if (!destination_description) {
      setErrorMessage("Please enter a Destination");
      return;
    }
    if (!meta_title) {
      setErrorMessage("Please enter a meta title");
      return;
    }
    if (!meta_description) {
      setErrorMessage("Please enter a meta description");
      return;
    }
    if (!meta_keyword) {
      setErrorMessage("Please enter a meta keyword");
      return;
    }
  
    setLoading(true);

  
    dispatch(
      addNewDestination({
        destination_name:destination_name,
        image: localStorage.getItem("filename"),
        destination_description: destination_description,
        meta_description: meta_description,
        meta_keyword: meta_description,
        meta_title: meta_title,
        
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New destination Added!", status: 1 }));
        setLoading(false);
  
        // Use the navigate function to navigate to the desired URL
        navigate("/app/destinations");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding destination:", error);
        setErrorMessage("Error adding destination. Please try again.");
        setLoading(false);
      });
  };
  

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setDestinationData({ ...destinationData, [updateType]: value });
  };
  const closeModal =()=>{
    navigate('/app/destinations')
  }

  return (
    <>
      <TitleCard title="Add Destionation" topMargin="mt-2" >
       
       

      <InputText
      type="text"
      value={destinationData.destination_name}
          placeholder="Country Name"
          updateType="destination_name"
          containerStyle="mt-4"
          labelTitle="Country Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        
        <InputText
          type="text"
          
          placeholder="Destination"
          updateType="destination_description"
          containerStyle="mt-4"
          labelTitle="Destination"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
      


        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>Cover Pic</span>
        </label>


        <UploadSingleFiles/>

        <InputText
        type="text"
        defaultValue={destinationData.meta_title}
        placeholder="Meta Title"
        updateType="meta_title"
        containerStyle="mt-4"
        labelTitle="Meta Title"
        updateFormValue={updateFormValue}
      />


      <TextAreaInput type="text" defaultValue={destinationData.meta_description}
        placeholder="Meta Description"
        updateType="meta_description"
        containerStyle="mt-4"
        labelTitle="Meta Description"
        updateFormValue={updateFormValue} />

        
      <TextAreaInput type="text" defaultValue={destinationData.meta_keyword}
      placeholder="Meta Keyword"
      updateType="meta_keyword"
      containerStyle="mt-4"
      labelTitle="MetaKeyword"
      updateFormValue={updateFormValue} />


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

export default AddDestionationModalBody;
