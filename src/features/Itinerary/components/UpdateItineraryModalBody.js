import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";
import { updateItineraryName } from "../itinerarySlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { useSelector } from "react-redux";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { getItineraryContent } from '../itinerarySlice'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const INITIAL_ITINERARY_OBJ = {
  itinerary_name: "",
  image:"",
  parent_id: "",
  itinerary_description: "",

};

function UpdateItineraryModalBody() {


  const [errorMessage, setErrorMessage] = useState("");
  const [itineraryData, setItineraryData] = useState(INITIAL_ITINERARY_OBJ);
  const { leads } = useSelector((state) => state.itinerary);
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  });


  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const name = spliturl[2];
  const decodeName = decodeURIComponent(name)
  const ourDescription = spliturl[3];
  const decodeDescription = decodeURIComponent(ourDescription);
  const ourImage = spliturl[4];
  const decodeImage= decodeURIComponent(ourImage);


  const closeModal =()=>{
    navigate('/app/itinerary')
  }



  const updateEditorContent = (newContent) => {
    const newContentState = ContentState.createFromText(newContent);
    const newEditorState = EditorState.createWithContent(newContentState);
    setEditorState(newEditorState);
  };


  const { itineraryId, itineraryName, itineraryDescription } = useSelector((state) => state.itinerary);
  useEffect(() => {
    const rawContent = JSON.parse(decodeDescription);
    const contentState = convertFromRaw(rawContent);
    const editorStateFromDescription = EditorState.createWithContent(contentState);
    setEditorState(editorStateFromDescription);
  }, [setEditorState]);
  const dispatch = useDispatch()
  const [itinerary, setItinerary] = useState(itineraryName);
  const [editId, setEditId] = useState(itineraryId);
  const [description, setDescription] = useState(itineraryDescription);


  useEffect(() => {
    dispatch(getItineraryContent());
  }, [dispatch]);


  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setItineraryData({ ...itineraryData, [updateType]: value });
  };
  const handleUpdateClick = () => {
    // Call the function to update the editor content
    updateEditorContent("New content for the editor");
  };



  const updateItineraryInAPI = () => {
    const itineraryMetaTitle = itineraryData.itinerary_name || decodeName;

    // if (!itinerary_name) {
    //   setErrorMessage("Please enter a itinerary name");
    //   return;
    // }

    // Get the editor's content as JSON
    const contentState = editorState.getCurrentContent();
    const itinerary_description = JSON.stringify(convertToRaw(contentState));

    if (!itinerary_description || itinerary_description === '{"blocks":[{"key":"foo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}') {
      setErrorMessage("Please enter a description");
      return;
    }

    setLoading(true);

    dispatch(
      updateItineraryName({
        id: id,
        newName: itineraryMetaTitle,
        newDescription: itinerary_description,
        newImage:localStorage.getItem("filename")
      })
    )
      .then(() => {
        dispatch(showNotification({ message: "Itinerary Updated Successfully!", status: 1 }));
        setLoading(false);

        // Update the defaultEditorContent with the current editor content
        navigate("/app/itinerary");
      })
      .catch((error) => {
        console.error("Error updating Itinerary:", error);
        setErrorMessage("Error updating itinerary. Please try again.");
        setLoading(false);
      });
  };
  const handleFileInputChange = () => {

  }

  return (
    <>
      <TitleCard title="Update Itinerary" topMargin="mt-2">


        <InputText
          type="text"
          defaultValue={decodeName}
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
          onEditorStateChange={(newEditorState) => {
            setEditorState(newEditorState);
          }}
          editorStyle={{ border: "1px solid #e5e7eb" }}
        />

        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>
            Image
          </span>
        </label>
        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img src={`http://127.0.0.1:8800/data/uploads/${decodeImage}`} alt=""  height="100px" width="100px"/>


        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateItineraryInAPI}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateItineraryModalBody;
