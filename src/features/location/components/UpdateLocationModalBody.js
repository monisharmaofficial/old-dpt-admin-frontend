import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";
import { updateLocationName } from "../locationSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { useSelector } from "react-redux";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const INITIAL_LOCATION_OBJ = {
  location_name: "",
};

function UpdateLocationModalBody() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { locationId, locationName } = useSelector((state) => state.location);
  useEffect(() => {
    setCatg(locationName);
    setEditId(locationId);
    
  }, [locationName, locationId]);
  const dispatch = useDispatch();
  const [catg, setCatg] = useState(locationName);
  const [editId, setEditId] = useState(locationId);

  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const location_name = spliturl[2];
  const decodeName = decodeURIComponent(location_name)



  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [locationData, setLocationData] = useState(INITIAL_LOCATION_OBJ);
  const { leads } = useSelector((state) => state.location);
  const location = useLocation();



  const navigate = useNavigate(); // Initialize useNavigate
 




  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLocationData({ ...locationData, [updateType]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const saveFileToLocal = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target.result;
      localStorage.setItem("savedFile", fileData);
    };
    reader.readAsDataURL(file);
  };

  const updateLocationNameInAPI = () => {
    const locationName = locationData.location_name || decodeName;
    // if (!locationData.location_name || locationData.location_name.trim() === "") {
    //   return setErrorMessage("location Name is required!");
    // } else {
      // Dispatch the action
      dispatch(updateLocationName({
        id: id, newName: locationName
      }))
        .then(() => {
          dispatch(
            showNotification({
              message: "location Updated Successfully!",
              status: 1,
            })
          );
          // Navigate to the desired route after successful update
          navigate("/app/hotel-location");
        })
        .catch((error) => {
          setErrorMessage("Failed to update location name.");
          console.error("Error updating location name:", error);
        });
    
  };
  const closeModal =()=>{
    navigate('/app/hotel-location')
  }

  return (
    <>
      <TitleCard title="Update location" topMargin="mt-2">
       

        <InputText
          type="text"
          defaultValue={decodeName}
          placeholder="Location Name"
          updateType="location_name"
          containerStyle="mt-4"
          labelTitle="Loation Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />





        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateLocationNameInAPI}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateLocationModalBody;
