import React, { useState, useEffect } from "react";
import slugify from 'react-slugify';
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { addNewAttraction, getAttractionContent } from "../attractionSlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";


import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { useNavigate } from "react-router-dom";

const INITIAL_ATTRACTION_OBJ = {
  name: "",
  parent_id: "",
  slug:"",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword:""
};

function AddAttractionModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attractionData, setAttractionData] = useState(INITIAL_ATTRACTION_OBJ);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  useEffect(() => {
    dispatch(getAttractionContent());
  }, [dispatch]);

  useEffect(() => {
    const updatedSlug = slugify(attractionData.name);
    setAttractionData((prevData) => ({ ...prevData, slug: updatedSlug }));
  }, [attractionData.name]);

  const { leads } = useSelector((state) => state.attraction);

  const uploadImageToPublicFolder = () => {
    const { name, parent_id, slug,meta_title, meta_description,meta_keyword } = attractionData;
    
    if (!name) {
      setErrorMessage("Please enter a Attraction name");
      return;
    }
    if (!meta_keyword) {
      setErrorMessage("Please enter a meta keyword");
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
  
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const description = JSON.stringify(rawContentState);
  
    // Check if the description is empty
    if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }
  
    setLoading(true);
  
    dispatch(
      addNewAttraction({
        name: name,
        image: localStorage.getItem("filename"),
        meta_title: meta_title,
        slug:slug,
        description: description,
        meta_description: meta_description,
        meta_keyword:meta_keyword
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "New Attraction Added!", status: 1 }));
        setLoading(false);
        // Use the navigate function to navigate to the desired URL
        navigate("/app/Attraction");
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error adding Attraction:", error);
        setErrorMessage("Error adding Attraction. Please try again.");
        setLoading(false);
      });
  };
  const closeModal =()=>{
    navigate('/app/attraction')
  }
  


  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setAttractionData({ ...attractionData, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Add Attraction" topMargin="mt-2" >
       

        <InputText
        type="text"
        defaultValue={attractionData.name}
        placeholder="Attraction Name"
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Attraction Name"
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
        <InputText
          type="text"
          defaultValue={attractionData.meta_title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput type="text" defaultValue={attractionData.meta_description}
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue} />

          <TextAreaInput type="text" defaultValue={attractionData.meta_keyword}
          placeholder="Meta Keyword"
          updateType="meta_keyword"
          containerStyle="mt-4"
          labelTitle="Meta Keyword"
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

export default AddAttractionModalBody;
