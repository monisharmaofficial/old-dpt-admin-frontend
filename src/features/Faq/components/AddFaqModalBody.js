import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewFaq, getFaqContent } from "../faqSlice";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import TextAreaInput from "../../../components/Input/TextAreaInput";

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_FAQ_OBJ = {
  name: "",
  description: "",
};

function AddDestionationModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [faqData, setFaqData] = useState(INITIAL_FAQ_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    dispatch(getFaqContent());
  }, [dispatch]);


  const uploadImageToPublicFolder = () => {
    const { name, description} = faqData;
  
    if (!name) {
      setErrorMessage("Please enter a Question");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a Answer");
      return;
    }
  
    setLoading(true);

  
    dispatch(
      addNewFaq({
        name:name,
        description: description,
        
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New Faq Added!", status: 1 }));
        setLoading(false);
  
        // Use the navigate function to navigate to the desired URL
        navigate("/app/faq");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding Faq:", error);
        setErrorMessage("Error adding Faq. Please try again.");
        setLoading(false);
      });
  };
  

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setFaqData({ ...faqData, [updateType]: value });
  };
  const closeModal =()=>{
    navigate('/app/faq')
  }

  return (
    <>
      <TitleCard title="Add Faq" topMargin="mt-2" >
       
       

      <InputText
      type="text"
      value={faqData.name}
          placeholder="Question"
          updateType="name"
          containerStyle="mt-4"
          labelTitle="Question"
          updateFormValue={updateFormValue}
          isRequired={true}
        />
        
        <InputText
          type="text"
          
          placeholder="Answer"
          updateType="description"
          containerStyle="mt-4"
          labelTitle="Answer"
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

export default AddDestionationModalBody;
