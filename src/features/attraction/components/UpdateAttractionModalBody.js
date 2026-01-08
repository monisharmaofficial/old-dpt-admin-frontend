import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from 'react-slugify';
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { updateAttractionName, getAttractionContent } from "../attractionSlice";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useNavigate } from "react-router-dom";

const INITIAL_ATTRACTION_OBJ = {
  name: "",
  slug:"",
  image:"",
  parent_id: "",
  short_description: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword:"",
};

function UpdateAttractionModalBody() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attractionData, setAttractionData] = useState(INITIAL_ATTRACTION_OBJ);

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAttractionContent());
  }, [dispatch]);
  useEffect(() => {
    const updatedSlug = slugify(attractionData.name);
    setAttractionData((prevData) => ({ ...prevData, slug: updatedSlug }));
  }, [attractionData.name]);

  const updateEditorContent = (newContent) => {
    const newContentState = ContentState.createFromText(newContent);
    const newEditorState = EditorState.createWithContent(newContentState);
    setEditorState(newEditorState);
  };


  const { leads } = useSelector((state) => state.attraction);
  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const name = spliturl[2];
  const decodeName = decodeURIComponent(name);
  const short_description = spliturl[3];
  const decodeShort_description = decodeURIComponent(short_description);
  const meta_title = spliturl[4];
  const decodeMeta_Title = decodeURIComponent(meta_title);
  const meta_description = spliturl[5];
  const decodeMeta_description = decodeURIComponent(meta_description);
  const ourDescription = spliturl[6];
  const decodeDescription = decodeURIComponent(ourDescription);
  const ourKeyword = spliturl[7];
  const decodeMetaKeyword = decodeURIComponent(ourKeyword);
  const ourImage = spliturl[8];
  const decodeImage= decodeURIComponent(ourImage);


  // Parse the JSON description and convert it to EditorState



  // Set the initial editorState from the description
  useEffect(() => {
    const rawContent = JSON.parse(decodeDescription);
    const contentState = convertFromRaw(rawContent);
    const editorStateFromDescription = EditorState.createWithContent(contentState);
    setEditorState(editorStateFromDescription);
  }, [setEditorState]);

  const updateAttractionInAPI = () => {
    const attractionNameValue = attractionData.name || decodeName || "";
    const attractionMetaTitle = attractionData.meta_title || decodeMeta_Title;
    const attractionMetaDescription = attractionData.meta_description || decodeMeta_description;
    const attractionMetaKeyword = attractionData.meta_keyword || decodeMetaKeyword;
    const attractionSlug = attractionData.slug 

  
    const { parent_id } = attractionData;
  
    if (!attractionNameValue.trim()) {
      setErrorMessage("Please enter a attraction name");
      return;
    }
  
    // Get the editor's content as JSON
    const contentState = editorState.getCurrentContent();
    const description = JSON.stringify(convertToRaw(contentState));
  
    if (!description || description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }
  
    setLoading(true);
  
    dispatch(
      updateAttractionName({
        id: id,
        newName: attractionNameValue,
        newImage: localStorage.getItem("filename"),
        newSlug:attractionSlug,
        newDescription: description,
        newMetaTitle: attractionMetaTitle,
        newMetaDescription: attractionMetaDescription,
        newMetaKeyword: attractionMetaKeyword,
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "attraction Updated Successfully!", status: 1 }));
        setLoading(false);
  
        // Update the defaultEditorContent with the current editor content
        navigate("/app/attraction");
      })
      .catch((error) => {
        console.error("Error updating attraction:", error);
        setErrorMessage("Error updating attraction. Please try again.");
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
      <TitleCard title="Update Attraction" topMargin="mt-2">
  

        <InputText
          type="text"
          defaultValue={decodeName || ""}
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
          onEditorStateChange={(newEditorState) => {
            setEditorState(newEditorState);
          }}
          editorStyle={{ border: "1px solid #e5e7eb" }}
        />

        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>Banner</span>
        </label>

        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img src={`http://127.0.0.1:8800/data/uploads/${decodeImage}`} alt=""  height="100px" width="100px"/>

        <InputText
          type="text"
          defaultValue={decodeMeta_Title}
          placeholder="Meta Title"
          updateType="meta_title"
          containerStyle="mt-4"
          labelTitle="Meta Title"
          updateFormValue={updateFormValue}
        />

        <TextAreaInput
          type="text"
          defaultValue={decodeMeta_description}
          placeholder="Meta Description"
          updateType="meta_description"
          containerStyle="mt-4"
          labelTitle="Meta Description"
          updateFormValue={updateFormValue}
        />
        <TextAreaInput
        type="text"
        defaultValue={decodeMetaKeyword}
        placeholder="Meta Keyword"
        updateType="meta_keyword"
        containerStyle="mt-4"
        labelTitle="Meta Keyword"
        updateFormValue={updateFormValue}
      />

        {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateAttractionInAPI}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateAttractionModalBody;
