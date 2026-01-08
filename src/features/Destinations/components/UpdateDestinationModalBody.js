import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { useLocation } from "react-router-dom";
import { updateDestinationName } from "../destinationSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import { useSelector } from "react-redux";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import UploadSingleFiles from "../../../components/UploadFiles/upload-single-files";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const INITIAL_DESTINATION_OBJ = {
  destination_name: "",
  image: "",
  destination_description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
};

function UpdateDestinationModalBody() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { destinationId, destinationName, destination_description } =
    useSelector((state) => state.destination);
  useEffect(() => {
    setCatg(destinationName);
    setEditId(destinationId);
    setParentId(destination_description);
  }, [destinationName, destinationId, destination_description]);
  const dispatch = useDispatch();
  const [catg, setCatg] = useState(destinationName);
  const [editId, setEditId] = useState(destinationId);
  const [parentId, setParentId] = useState(destination_description);
  const url = window.location.href;
  const spliturl = url.split("=");
  const id = spliturl[1];
  const destination_name = spliturl[2];
  const decodeName = decodeURIComponent(destination_name);
  const ourDestination = spliturl[3];
  const decodeDestination = decodeURIComponent(ourDestination);
  const meta_title = spliturl[4];
  const decodeMeta_Title = decodeURIComponent(meta_title);
  const meta_description = spliturl[5];
  const decodeMeta_description = decodeURIComponent(meta_description);
  const ourMetaKeyword = spliturl[6];
  const decodeMetaKeyword = decodeURIComponent(ourMetaKeyword);
  const ourImage = spliturl[7];
  const decodeImage = decodeURIComponent(ourImage);

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [destinationData, setDestinationData] = useState(
    INITIAL_DESTINATION_OBJ
  );
  const { leads } = useSelector((state) => state.destination);
  const location = useLocation();

  const navigate = useNavigate(); // Initialize useNavigate
  const closeModal = () => {
    navigate("/app/destinations");
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setDestinationData({ ...destinationData, [updateType]: value });
  };

  const updateDestinationNameInAPI = () => {
    const destionationName = destinationData.destination_name || decodeName;
    const destionationDescription =
      destinationData.destination_description || decodeDestination;
    const destinationMetaTitle = destinationData.meta_title || decodeMeta_Title;
    const destinationMetaDescription =
      destinationData.meta_description || decodeMeta_description;
    const destinationMetaKeyword =
      destinationData.meta_keyword || decodeMetaKeyword;
    // if (!destinationData.destination_name || destinationData.destination_name.trim() === "") {
    //     return setErrorMessage("Country Name is required!");
    // }
    // if (!destinationData.destination_description|| destinationData.destination_description.trim() === "") {
    //     return setErrorMessage("Description is required!");
    // } else {
    // Dispatch the action
    dispatch(
      updateDestinationName({
        id: id,
        newName: destionationName,
        newImage: localStorage.getItem("filename"),
        newDestination: destionationDescription,
        newMetaTitle: destinationMetaTitle,
        newMetaKeyword: destinationMetaKeyword,
        newMetaDescription: destinationMetaDescription,
      })
    )
      .then(() => {
        dispatch(
          showNotification({
            message: "Destination Updated Successfully!",
            status: 1,
          })
        );
        // Navigate to the desired route after successful update
        navigate("/app/destinations");
      })
      .catch((error) => {
        setErrorMessage("Failed to update destination name.");
        console.error("Error updating destination name:", error);
      });
  };

  return (
    <>
      <TitleCard title="Update Destination" topMargin="mt-2">
        <InputText
          type="text"
          defaultValue={decodeName}
          placeholder="Country Name"
          updateType="destination_name"
          containerStyle="mt-4"
          labelTitle="Country Name"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <InputText
          type="text"
          defaultValue={decodeDestination}
          placeholder="Destination"
          updateType="destination_description"
          containerStyle="mt-4"
          labelTitle="Destination"
          updateFormValue={updateFormValue}
          isRequired={true}
        />

        <label className="label">
          <span className={"label-text font-semibold text-base-content"}>
            Cover Pic
          </span>
        </label>

        <UploadSingleFiles updateImageFilename={updateFormValue} />
        <img
          src={`http://127.0.0.1:8800/data/uploads/${decodeImage}`}
          alt=""
          height="100px"
          width="100px"
        />

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

        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={() => closeModal()}>
            Cancel
          </button>
          <button
            className="btn btn-primary px-6"
            onClick={updateDestinationNameInAPI}
          >
            Save
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default UpdateDestinationModalBody;
